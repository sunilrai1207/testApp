export function validate(value,rules){
    let isValid = true;
    let errorMessage = "Invalid data";
    for(let i =0;i<rules.length;i++){
        switch(Object.keys(rules[i])[0]){
            case "rangeValidator":
                if(isValid){
                    errorMessage= `Invalid password`
                }
                
                isValid = isValid && rangeValidator(value,rules[i][Object.keys(rules[i])])
                break;
            case "passwordValidator":
                if(isValid){
                    errorMessage= `Invalid password`
                }
                
                isValid = isValid && passwordValidator(value,rules[i][Object.keys(rules[i])])
                break;
                
            case "minLength":
                if(isValid){
                    errorMessage= 'Minimum length should be 5 characters'//`minimum length should be ${rules[i][Object.keys(rules[i])[0]]}`
                }
                isValid = isValid && minLengthValidator(value,rules[i][Object.keys(rules[i])[0]])
                break;
                case "isRequired":
                    if(isValid){
                        errorMessage= "";
                    }
                    isValid = isValid && requiredValidator(value)
                    break;
                case "isEmail":
                    if(isValid){
                        errorMessage= "Email format is incorrect";
                    }
                    isValid = isValid && emailValidator(value)
                    break;
                case "isNumber":
                    if(isValid){
                        errorMessage= "Please enter only numeric values";
                    }
                    isValid = isValid && numberValidator(value);
                    break;
                case "maxLength":
                    if(isValid){
                        errorMessage= `maximum length should not be more the ${rules[i][Object.keys(rules[i])[0]]}`;
                    }
                    isValid = isValid && maxLengthValidator(value,rules[i][Object.keys(rules[i])[0]]);
                    break;
                case "invalidDateValidator":
                    if(isValid){
                        errorMessage= `Invalid Date`;
                    }
                    isValid = isValid //&& validateDateValidator(value)
                break;
                case "panValidator":
                    if(isValid){
                        errorMessage= `Invalid pan number`;
                    }
                    isValid = isValid && panValidator(value)
                break; 
        }
    }
    errorMessage = isValid ? "":errorMessage;
    return {isValid,errorMessage}
}
const minLengthValidator = function(value,minLength){
    return value?value.length>=minLength:0>=minLength;
};
const rangeValidator = function(value,range){
    let min = range[0],max = range[1]
    let res = (value.length >= min && value.length <= max);
    return res
};
const passwordValidator = function(value,range){
    var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
    return regex.test(value);
    
};

const maxLengthValidator = function(value,maxLength){
    return  value.length<= maxLength;
}
const requiredValidator = function(value){
    if(value && value !==""){
        return true;
    } else {
        return false;
    }
}
const numberValidator = function(value){
    let res = /^[6789]\d{9}$/;
    return res.test(String(value))
}

const emailValidator = function(value){
    let res = /^[6789]\d{9}$/;
    return res.test(String(value))
}
const emailValidator2 = function(value){
    let res = /^[6789]\d{9}$/;
    return res.test(String(value))
}
const panValidator = function(value){
    let res = /^[6789]\d{9}$/;
    return res.test(String(value))
}