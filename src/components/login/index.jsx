import { useState, useEffect, useRef } from "react";
import { convertorEngine } from "../helpers/convertor";
import { validate } from "../helpers/validators";
import { setCookie, getCookie, isLoginUser } from "../helpers/common";
import { loginUser } from "../redux/login/loginActions";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
let formControl = {
    username: {
        value: "",
        isError: false,
        errorMessage: "",
        validationRules: [{ isRequired: "" }, { minLength: "5" }],
        convetorRules: { usernameConvertor: "" },
        minLength: 5,
        isShow: false,

    },
    password: {
        value: "",
        isError: false,
        errorMessage: "",
        validationRules: [{ isRequired: "" }, { rangeValidator: [8, 16] }, { passwordValidator: "" }],
        convetorRules: { passwordConvertor: "" },
        minLength: 8,
        maxLength: 16,
        isShow: false,
    }
}
const intialState = {
    isLogin: false,
    isFormSumbitted: false,
    formControl: formControl,
    isFormValid: false,
    message: ""
};

function Login(props) {
    const InputRef = useRef(null);
    const [state, setState] = useState({ ...intialState });
    const dispatchLogin = useDispatch();
    const { userLogin } = useSelector(
        (state) => ({
            userLogin: state.login.loginData,
        }),
        shallowEqual

    );

    useEffect(() => {
        InputRef.current.focus();
        let isLogin = isLoginUser();
        if (isLogin) {
            props.history.push({
                pathname: '/gamesedition',
                search: ''
            });
        }
    }, []);
    useEffect(() => {
        if (userLogin && !userLogin.isSuccess && userLogin.msg) {
            let newState = JSON.parse(JSON.stringify(state));
            newState.message = userLogin.msg;
            setState({ ...newState });
        } else if (userLogin && userLogin.isSuccess) {
            const request = {
                "UserName": userLogin.userName,
                "Password": userLogin.email,
                "Token": userLogin.token
            }
            setCookie("kheloindia", btoa(JSON.stringify(request)), 1)
            props.history.push({
                pathname: '/gamesedition',
                search: ''
            });
        }
    }, [userLogin]);
    const handleChange = (event) => {
        event.preventDefault();
        let newState = JSON.parse(JSON.stringify(state));
        let name = event.target.name;
        let value = event.target.value.trimStart();
        const formControl = { ...state.formControl }
        const formElement = { ...formControl[name] }
        formElement.value = convertorEngine(value, formElement.convetorRules);
        if (newState.isFormSumbitted) {
            let validationResult = validate(formElement.value, formElement.validationRules)
            formElement.errorMessage = validationResult.errorMessage;
            formElement.isError = !validationResult.isValid;
        }
        formControl[name] = formElement;
        let isFormValid = true;
        for (let item in formControl) {
            isFormValid = !formControl[item].isError && isFormValid;
        }
        newState.formControl = formControl;
        newState.isFormValid = isFormValid;
        setState({ ...newState });
    };

    const login = (e) => {
        e.preventDefault();
        let formState = JSON.parse(JSON.stringify(state));
        formState.isFormSumbitted = true;
        let isFromValid = true;
        let formControl = formState.formControl
        for (let item in formControl) {

            let formElement = { ...formControl[item] };

            let validationResult = validate(formElement.value, formElement.validationRules);
            formElement.isError = !validationResult.isValid;
            formElement.errorMessage = validationResult.errorMessage
            formControl[item] = formElement;
            isFromValid = validationResult.isValid && isFromValid
        }
        formState.formControl = formControl;
        formState.isFromValid = isFromValid;

        setState({ ...formState })

        if (isFromValid) {

            const request = {
                "UserName": formState.formControl.username.value,
                "Password": formState.formControl.password.value,

            }
            dispatchLogin(loginUser(request));
        }


    };
    const errorCls = (element) => {

        if (element.isError) {
            return "error";
        }
    }
    console.log("selector data", userLogin);


    return <>
        <form onSubmit={login} noValidate >
            <div className="login-box">
                <div className="logo"><img src="images/logo.png" alt="" /></div>
                <div className="form-group loginFfield">
                    <label>Username</label>
                    <input type="text" name="username" ref={InputRef} autoComplete="off" id="Uname" placeholder="Enter username" className={`form-control ${errorCls(state.formControl.username)}`}
                        minLength={state.formControl.username.minLength} value={state.formControl.username.value}
                        onChange={handleChange} />
                    {state.formControl.username.isError ?
                        <span className="error">{state.formControl.username.errorMessage}</span>
                        : null}
                </div>
                <div className="form-group loginFfield">
                    <label>Password</label>
                    <input type="password" name="password" autoComplete="off" id="Pass" placeholder="Enter password" className={`form-control ${errorCls(state.formControl.username)}`}
                        minLength={state.formControl.password.minLength} maxLength={state.formControl.password.maxLength} value={state.formControl.password.value}
                        onChange={handleChange} />
                    {state.formControl.password.isError ?
                        <span className="error">{state.formControl.password.errorMessage}</span>
                        : null}
                </div>
                <div className="form-group loginFfield">
                    <button type="submit">Sign In</button>
                    {state.isFormSumbitted ? 1 : 2}
                </div>
                {state.message ?
                    <span className="error">
                        {state.message}
                    </span> : null}
            </div>
        </form>
        <div className="login-boxBg">
            <img src="images/login-bg.png" alt="" />
        </div>
        <div className="right-top-bg"><img src="images/right-top-bg.png" alt="" /></div>
        <div className="tiger-bg" data-aos="fade-up" data-aos-duration="3000">
            <img src="images/tiger-bg.png" alt="" />
        </div>
    </>
}

export default Login