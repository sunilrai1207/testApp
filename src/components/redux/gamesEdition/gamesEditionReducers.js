import * as types from "./gamesEditionActionType"
 const initialState = {       
    gamesList:[]
};

function gamesEditionReducer(state = initialState, action) {
  
    switch (action.type) {
      case types.GET_GAMESEDITIONS:
        return {
          ...state, 
          gamesList: action.payload,        
        };
        case types.CREATE_GAMESEDITIONS:
        return {
          ...state,         
        };
        case types.UPDATE_GAMESEDITIONS:
        return {
            ...state,         
        };
        case types.DELETE_GAMESEDITIONS:
        return {
            ...state,         
        };
      default:
        return state;
    }
  }
export default gamesEditionReducer;