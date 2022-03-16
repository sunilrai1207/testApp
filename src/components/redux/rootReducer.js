import { combineReducers } from "redux";
import loginReducer from "../redux/login/loginReducers";
import gamesEditionReducer from "../redux/gamesEdition/gamesEditionReducers";
import functionalAreasReducer from "../redux/functionalArea/faReducers";

export default combineReducers({
  login: loginReducer,
  gamesEdtion: gamesEditionReducer,
  functionalArea: functionalAreasReducer,
});
