import HeaderComponent from "../header/header";
import FooterComponent from "../footer/footer";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getFunctionalArea } from "../redux/functionalArea/faAction";
import {setCookie,getCookie,isLoginUser} from "../helpers/common";
import FunctionalList from "../functionalArea/functionalAreaList/FunctionalList";
const initialState = {
    faList: []
}
function FunctionalArea(props) {
    const dispatch = useDispatch();
    const [keyState, setState] = useState(initialState);
    const { functionalAreaList } = useSelector(
        (state) => ({
            functionalAreaList: state.functionalArea.faList,
        }),
        shallowEqual

    );
    
    useEffect(() => {
        let isLogin = isLoginUser();
        if(!isLogin) {
            props.history.push({
                pathname: '/',
                search: ''
            });
        }
        document.getElementById('root').classList.remove("loginStyle");
        dispatch(getFunctionalArea(1));
    }, [])
    console.log("functionalAreaList", functionalAreaList)
    return <React.Fragment>
        <div class="main-container">
            <HeaderComponent />
            {functionalAreaList.length > 0 ?
                <FunctionalList /> : null}
            <FooterComponent />
        </div>
    </React.Fragment>
}

export default FunctionalArea;