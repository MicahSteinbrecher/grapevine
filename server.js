const express = require('express');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


app.get('/api/events', (req, res) => {

  if (!param) {
    res.status(400).send({status: "failure", error: "query empty"})
    return;
  } else {
      res.status(200).send({status: "success"});
  }

});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
