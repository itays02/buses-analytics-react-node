const express = require("express");
const router = express.Router();
const { loadDriversData } = require('.././actions/drivers');

router.get('/data', (req, res) => {

    loadDriversData().then(result => {
        const driversData = result;

        res.send({
            data: driversData
        });
    }, (err) => {
        res.status(400).send({msg: "Error in getting driver's data", err});
    });

});

module.exports = router;