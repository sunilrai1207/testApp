import * as types from "./gamesEditionActionType";
import {getRequest,deleteRequest, postRequest} from "../../../utils/api";
export const getGamesEditions = (request) =>{
  let Url = "Data/GetGamesEdition"
    return dispatch => {       
      getRequest(Url,request).then(res=>{           
          let payload = res.data;
          console.log("GetGamesEdition",payload)
          dispatch(getGamesEditionsAction(payload))
        });
    }
};
export const deleteEditionsAction = (gamesEditionId)=>{  
      return deleteRequest("Data/deleteGamesEdition?gamesEditionId="+gamesEditionId);
}

export function getGamesEditionsAction(payload) {    
    return {
      type: types.GET_GAMESEDITIONS,
      payload,
    };
}
export function createGamesEditions(request) {    
  let Url = "Data/updateGamesEdition"
  return postRequest(Url,request);
}
export function updateGamesEditions(payload) {    
    return {
      type: types.UPDATE_GAMESEDITIONS,
      payload,
    };
}
export function deleteGamesEditions(payload) {    
    return {
      type: types.DELETE_GAMESEDITIONS,
      payload,
    };
}