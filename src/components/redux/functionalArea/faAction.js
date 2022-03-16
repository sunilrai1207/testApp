import * as types from "./faActionType";
import {getRequest} from "../../../utils/api";
export const getFunctionalArea = (faId) =>{
  let Url = "Data/GetFunctionalAreas?GamesEditionId="+faId
    return dispatch => {       
      getRequest(Url).then(res=>{           
          let payload = res.data;
          console.log("GetFunctionalAreas",payload)
          dispatch(getFunctionalAreaAction(payload))
        });
    }
};

export function getFunctionalAreaAction(payload) {    
    return {
      type: types.GET_FUNCTIONALAREAS,
      payload,
    };
}
export function createFunctionalArea(payload) {    
    return {
      type: types.CREATE_FUNCTIONALAREAS,
      payload,
    };
}
export function updateFunctionalArea(payload) {    
    return {
      type: types.UPDATE_FUNCTIONALAREAS,
      payload,
    };
}
export function deleteFunctionalArea(payload) {    
    return {
      type: types.DELETE_FUNCTIONALAREAS,
      payload,
    };
}