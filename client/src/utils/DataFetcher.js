const axios = require('axios');

module.exports = {
    getExpectedTimes: () => {
        return axios.get('/times/data')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    getDriversData: () => {
        return axios.get('/drivers/data')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }
};