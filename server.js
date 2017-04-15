var EventSearch = require("facebook-events-by-location-core");
var utilities = require('./utilities')
var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var https = require('https');
var config = require('./config.json');

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

app.get('/get/facebookAppId', (req, res) => {
    var facebookAppId = config[app.get('env')].facebookAppId;
    return res.json({
        'facebookAppId': facebookAppId
    });
});

app.get('/get/accessCode', (req, res) => {
    console.log(config[app.get('env')]);
    https.get({
        host: 'graph.facebook.com',
        path: '/oauth/access_token?client_id='+config[app.get('env')].facebookAppId+'&client_secret='+config[app.get('env')].facebookAppSecret+'&grant_type=client_credentials'
    }, function(facebookRes) {
        // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
        facebookRes.setEncoding('utf8');

        // incrementally capture the incoming response body
        var body = '';
        facebookRes.on('data', function(d) {
            body += d;
        });

        // do whatever we want with the response once it's done
        facebookRes.on('end', function() {
            var appCode = body.split('"')[3];
            req.session.appCode = appCode;
            return res.sendStatus(200);
        });
    }).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request');
        return res.json({ error: 'failed to authorized', });
    });
});

app.get('/get/events', (req, res) => {
    var dateConstraint = new Date();
    dateConstraint.setDate(dateConstraint.getDate()+7);
    console.log(dateConstraint);
    var es = new EventSearch({
        "lat": req.session.location.lat,
        "lng": req.session.location.lng,
        'accessToken': req.session.appCode,
        'distance': '8000',
        'sort': 'time',
        'until': dateConstraint
    });

    es.search().then(function (events) {
        console.log(JSON.stringify(events, null, 4));
        events = utilities.prepareResults(events.events);
        return res.json({
                'events': events.results,
            });
    }).catch(function (error) {
        console.error(JSON.stringify(error));
        return res.json({
            error: 'error getting events',
        });
    });
});

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
