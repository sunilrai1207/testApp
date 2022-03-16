export function convertorEngine(value,convertors){
    let result = value;
    for(let convertor in convertors){
        switch(convertor){
            case "numericConvertor":
                result = numberConvertor(result);
            break;
            case "nameConvertor":
                result = nameConvertor(result);
            break;
            case "passwordConvertor":
                result = passwordConvertor(result);
            break;
            case "usernameConvertor":
                result = usernameConvertor(result);
            break;

        }
    }
    return result;
}
const numberConvertor = function(value) {
    return value.trim().replace(/[^0-9]/g,"");
};
const usernameConvertor = function(value) {
    return value.trim().replace(/[^A-Za-z0-9]/g,"");
};
const passwordConvertor = function(value) {
    var regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{16}$/;
    // return re.test(str);
    return value.trim().replace(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]$/,"");
};
const nameConvertor = function(value) {
    return value.trim().replace(/[^0-9]/g,"");
};