import { useEffect, useState } from "react";
import { convertorEngine } from "../../helpers/convertor";
import { validate } from "../../helpers/validators";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createGamesEditions,getGamesEditions } from "../../redux/gamesEdition/gamesEditionAction"
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
    isFormSumbitted: false,
    formControl: formControl,
    isFormValid: false,
    editGamesEditionId: 0,
}
function GamesEditionForm(props) {
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();
    useEffect(() => {
        document.getElementById('root').classList.remove("loginStyle");
        var element = document.getElementById("popup1");
        element.classList.add("showPopup");
    }, [])

    console.log("Render", state)
    return 
}
export default GamesEditionForm;