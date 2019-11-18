const express = require("express");
const router = express.Router();
const { loadExpectedTimes } = require('.././actions/times');

router.get('/data', (req, res) => {

    loadExpectedTimes().then(result => {
        const expectedTimes = result;

        res.send({
            data: expectedTimes
        });

    }, (err) => {
        res.status(400).send({msg: "Error in getting expected times", err});
    });

});

module.exports = router;