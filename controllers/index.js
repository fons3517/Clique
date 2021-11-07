const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();

app.get('/', function (req, res) {
  res.send('hello world');
});

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
  .listen(3000, function () {
    console.log('Example app listening on port 3000! Go to https://localhost:3000/')
  });


const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');
const groupRoutes = require('./group-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/group', groupRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;

