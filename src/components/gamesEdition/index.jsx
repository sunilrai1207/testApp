
import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getGamesEditions,createGamesEditions } from "../redux/gamesEdition/gamesEditionAction";
import HeaderComponent from "../header/header";
import FooterComponent from "../footer/footer";
import GamesList from "../gamesEdition/gamesList/gamesList"; 
import { setCookie, getCookie, isLoginUser } from "../helpers/common"; 
import { convertorEngine } from "../helpers/convertor";
import { validate } from "../helpers/validators";
 
 
let formControl = {
    GEYear: {
        value: "",
        isError: false,
        errorMessage: "",
        validationRules: [{ isRequired: "" }],
        convetorRules: {},
        minLength: 5,
        isShow: false,

    },
    proposedVanue: {
        value: "",
        isError: false,
        errorMessage: "",
        validationRules: [{ isRequired: "" }],
        convetorRules: {},
        minLength: 8,
        maxLength: 16,
        isShow: false,
    },
    edition: {
        value: "",
        isError: false,
        errorMessage: "",
        validationRules: [{ isRequired: "" }],
        convetorRules: {},
        minLength: 8,
        maxLength: 16,
        isShow: false,
    }
}
const initialState = {
    gamesList: [],
    formToggle: false,
    isFormSumbitted: false,
    formControl: formControl,
    isFormValid: false,
    editGamesEditionId: 0,
}
function GamesEdition(props) {
    const dispatch = useDispatch();
    const [keyState, setState] = useState(initialState);
    const { gamesList } = useSelector(
        (state) => ({
            gamesList: state.gamesEdtion.gamesList,
        }),
        shallowEqual

    );

    useEffect(() => {
        let isLogin = isLoginUser();
        if (!isLogin) {
            props.history.push({
                pathname: '/',
                search: ''
            });
        }
        document.getElementById('root').classList.remove("loginStyle");       
        dispatch(getGamesEditions());
    }, [])

    const showGamesEdition = () => {
        debugger
        let newState = { ...keyState };
        newState.formToggle = true;
        setState({ ...newState });
        var element = document.getElementById("popup1");
        element.classList.add("showPopup");
    }
    const closeGamesEdition = () => {
        var element = document.getElementById("popup1");
        element.classList.remove("showPopup");
        let newState = { ...keyState };
        newState.formToggle = false;
        setState({ ...newState });
    }
    const editGE =(value)=> {
        debugger
       // this.setState({ editGamesEditionId: value })
        let object = JSON.parse(JSON.stringify(gamesList));
        let state = JSON.parse(JSON.stringify(keyState))
        
        object = object.find(function (val) {
            return val.gamesEditionId === value.gamesEditionId
        })
        if (object) {
            state.formControl.GEYear.value = object.year;
            state.formControl.proposedVanue.value = object.proposedVenue;
            state.formControl.edition.value = object.edition;
            
            state.formToggle = true;
            setState({ ...state });
            setTimeout(()=>{
                var element = document.getElementById("popup1");
                element.classList.add("showPopup");
            },0)
           
        }

    }
    const createAndUpdateGE = (event) => {
        event.preventDefault();
        let newState = JSON.parse(JSON.stringify(keyState));
        let isFromValid = true;
        let formControl = { ...newState.formControl }
        for (let item in formControl) {
            let formElement = { ...formControl[item] };
            let validationResult = validate(formElement.value, formElement.validationRules);
            formElement.isError = !validationResult.isValid;
            formElement.errorMessage = validationResult.errorMessage
            formControl[item] = formElement;
            isFromValid = validationResult.isValid && isFromValid
        }
        newState.formControl = formControl;
        newState.isFromValid = isFromValid;
        newState.isFormSumbitted = true;
        setState({ ...newState })

        if (isFromValid) {


            const request = {
                GamesEditionId: newState.editGamesEditionId ? newState.editGamesEditionId : 0,
                Year: newState.formControl.GEYear.value,
                ProposedVenue: newState.formControl.proposedVanue.value,
                Edition: newState.formControl.edition.value,
                Status: null,
            }
            debugger
            createGamesEditions(request).then(function (response) {
                //if (response) {
                    // that.setState({ isGamesEdition: false });
                    dispatch(getGamesEditions());
                    var element = document.getElementById("popup1");
                    element.classList.remove("showPopup");
                //}
            });
        }
    }
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value.trimStart();
        let newState = JSON.parse(JSON.stringify(keyState));
        const formControl = { ...newState.formControl }
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

    }
    return <React.Fragment>
        <HeaderComponent />
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="heading">
                        <h1>Game Edition</h1>
                        <a href="javascript:void(0);" onClick={showGamesEdition}  >Create New</a>
                    </div>
                </div>
                {gamesList.length > 0 ?
                    <GamesList EditGE={editGE}  /> : null}
                <FooterComponent />
            </div>
        </div>
        {keyState.formToggle ? <>
        <div id="popup1" className="overlay">
            <div className="popup">
                <h2>Create New Games Edition</h2>
                <a className="close" href="javascript:void(0);" onClick={closeGamesEdition} >&times;</a>
                <div className="content">
                    <form onSubmit={createAndUpdateGE} noValidate>
                        <div className="form-group gameEdition-popup">
                            <label>Year</label>
                            <select name="GEYear" onChange={handleChange} value={keyState.formControl.GEYear.value} >
                                <option>Select year</option>
                                <option>2018</option>
                                <option>2019</option>
                                <option>2020</option>
                                <option>2021</option>
                            </select>
                        </div>
                        <div className="form-group gameEdition-popup">
                            <label>Proposed Venue(s)</label>
                            <input type="text" name="proposedVanue" value={keyState.formControl.proposedVanue.value} onChange={handleChange} className="form-control" placeholder="Enter Proposed Venue" />
                        </div>
                        <div className="form-group gameEdition-popup">
                            <label>Edition</label>
                            <input type="text" name="edition" value={keyState.formControl.edition.value} onChange={handleChange} className="form-control" placeholder="Enter Edition" />
                        </div>
                        <div className="form-group gameEdition-popup">
                            <button type="submit" className="form-control">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </> : null}
    </React.Fragment>
}

export default GamesEdition;