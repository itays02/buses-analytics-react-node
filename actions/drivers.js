const fs = require('fs');

module.exports = {
    loadDriversData: function () {

        return new Promise((resolve, reject) => {
            fs.readFile('./data/drivers_data.json', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data))
                }
            });
        });

    }
};
