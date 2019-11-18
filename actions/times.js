const fs = require('fs');
const csvjson = require('csvjson');

module.exports = {
    loadExpectedTimes: function () {

        return new Promise((resolve, reject) => {
            fs.readFile('./data/expected_running_times.csv', 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const jsonObj = csvjson.toObject(data);
                    resolve(jsonObj);
                }
            });
        });
    }
};
