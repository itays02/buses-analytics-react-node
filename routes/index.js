const express = require("express");
const router = express.Router();

router.use((req, res, next)=> {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    res.append('Content-Type', 'application/json');

    next();
});

router.get('/', (req, res) => {
    res.send('API made by Itay Eylon - Buses Analytics Page');
});

router.use('/drivers', require('./drivers'));
router.use('/times', require('./times'));

module.exports = router;
