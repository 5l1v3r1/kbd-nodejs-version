module.exports =  {
    SUCCESS_CODE: 200,

    filter(obj, list) {
        let newObj = {};
        list.forEach(function(prop) {
            newObj[prop] = obj[prop];
        });
        return newObj;
    },
    successMessage(message) {
        return {
            "code": this.SUCCESS_CODE,
            "message": message
        };
    },
    successData(data) {
        return {
            "code": this.SUCCESS_CODE,
            "data": data
        };
    }
};