import * as types from "./loginActionTypes"
 const initialState = { 
   loginData:{
    "token": null,
    "userName": null,
    "email": null,
    "isSuccess": false,
    "msg": ""
  },

};

function loginReducer(state = initialState, action) {
   
    switch (action.type) {
      case types.LOGIN_USER:
        return {
          ...state,         
        };
      case types.LOGIN_USER_SUCCESS: {
        
        return {
          ...state,
          loginData: action.payload,
       
        };
      }
  
      case types.LOGIN_USER_FAILED: {
        return {
          ...state,
          token: null,
          name: null,
          email: null,
        };
      } 
      default:
        return state;
    }
  }
export default loginReducer;