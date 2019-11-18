const express = require('express');
const path = require('path');
const app = express();
const request = require('request-promise');

app.use('/', require('./routes/index'));

app.listen(3002, () => {
    console.log('Buses Analytics Page server app listening on port 3002!');
});