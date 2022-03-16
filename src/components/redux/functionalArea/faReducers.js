import * as types from "./faActionType";
 const initialState = {       
    faList:[]
};

function functionalAreasReducer(state = initialState, action) {
   
    switch (action.type) {
      case types.GET_FUNCTIONALAREAS:
        return {
          ...state,  
          faList:action.payload       
        };
        case types.CREATE_FUNCTIONALAREAS:
        return {
          ...state,         
        };
        case types.UPDATE_FUNCTIONALAREAS:
        return {
            ...state,         
        };
        case types.DELETE_FUNCTIONALAREAS:
        return {
            ...state,         
        };
      default:
        return state;
    }
  }
export default functionalAreasReducer;