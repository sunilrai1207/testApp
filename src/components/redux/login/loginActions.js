import * as types from "./loginActionTypes";
import {postRequest} from "../../../utils/api";
 
export const loginUser = (request) =>{
  let Url = "Login/Login"
    return dispatch => {       
        postRequest(Url,request).then(res=>{           
          let payload = res.data.value;
          dispatch(loggingUserSuccess(payload))
        });
    }
};
export function loggingUserSuccess(payload) {   
 
    return {
      type: types.LOGIN_USER_SUCCESS,
      payload,
    };
  }