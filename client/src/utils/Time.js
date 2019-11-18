
module.exports = {

    getTime(dateString) {

        const date = new Date(dateString);
        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        return hours + ':' + minutes;
    },

    getStartDate(firstDateString, secondDateString){
        const firstDate = new Date(firstDateString);
        const secondDate = new Date(secondDateString);

        if(firstDate > secondDate){
            return secondDate;
        }else{
            return firstDate;
        }
    },

    getEndDate(firstDateString, secondDateString){
        const firstDate = new Date(firstDateString);
        const secondDate = new Date(secondDateString);

        if(firstDate > secondDate){
            return firstDate;
        }else{
            return secondDate;
        }
    }
};