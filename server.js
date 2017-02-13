var EventSearch = require("facebook-events-by-location-core");
var utilities = require('./utilities')
var app = require('express')();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
app.set('trust proxy', true)
app.use(session({
    name: 'server-session-cookie-id',
    secret: 'my express secret',
    proxy: true,
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(function printSession(req, res, next) {
    console.log('req.session', req.session);
    return next();
});

app.get('/set/location', (req, res) => {
    if ((typeof req.query.lat === 'undefined') || (typeof req.query.lng === 'undefined')) {
        return res.end('no location');
    } else {
        req.session.location = {
            lat: req.query.lat,
            lng: req.query.lng
        }
        res.sendStatus(200);
    }
});

app.get('/get/events', (req, res) => {
    var dateConstraint = new Date();
    dateConstraint.setDate(dateConstraint.getDate()+7);
    console.log(dateConstraint);
    var es = new EventSearch({
        "lat": req.session.location.lat,
        "lng": req.session.location.lng,
        'accessToken': req.query.accessToken,
        'distance': '2500',
        'sort': 'time',
        'until': dateConstraint
    });

    es.search().then(function (events) {
        console.log(JSON.stringify(events, null, 4));
        events = utilities.prepareResults(events.events);
        res.json({
                'events': events
            });
            return;
    }).catch(function (error) {
        console.error(JSON.stringify(error));
        res.json({
            error: 'Missing required parameter `q`',
        });
        return;
    });
});

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
