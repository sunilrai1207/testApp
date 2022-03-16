import React,{useState} from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {deleteEditionsAction,getGamesEditions} from "../../redux/gamesEdition/gamesEditionAction";
const initialState = {
    gamesEditionId: 0,
     
  };
export default function GamesList(props) {
    const [keyState, setState] = useState(initialState);
    const dispatch = useDispatch();
    const { gamesList } = useSelector(
        (state) => ({
            gamesList: state.gamesEdtion.gamesList,
        }),
        shallowEqual

    );
    const softDelete =(games)=>{
        
        console.log("Click delte")
        var element = document.getElementById("confirmation");
        element.classList.add("showPopup");
        let newState = {...keyState};
        newState.gamesEditionId = games.gamesEditionId;
        setState({...newState});
    }
    const closeDeletePopup =()=> {     
        var element = document.getElementById("confirmation");
        element.classList.remove("showPopup");
        let newState = {...keyState};
        newState.gamesEditionId = 0;
        setState({...newState});
      }
      const deleteRecord =()=> {
        
        deleteEditionsAction(keyState.gamesEditionId).then(function (response) {
          if (response) {
            var element = document.getElementById("confirmation");
            element.classList.remove("showPopup");
            dispatch(getGamesEditions());
          }
       })
      }
      
    return <React.Fragment>
        <div className="col-md-12">
            <div className="left-crative"><img src="images/login-bg.png" alt="" /></div>
            <div className="right-crative"><img src="images/login-bg.png" alt="" /></div>
            <div className="table-row">
                <table cellSpacing="0" cellPadding="0" className="tablestyle">
                    <tbody>
                        <tr>
                            <th  >Year</th>
                            <th>Proposed Venue(s)</th>
                            <th>Edition</th>
                            <th >Action</th>
                        </tr>

                        {gamesList.map((games, key) => {
                            return <tr>
                                <td>{games.year}</td>
                                <td><a className="proposedclas" href="khelo-india-school-game.html">{games.proposedVenue}</a></td>
                                <td>{games.edition}</td>
                                <td> <a href="javascript:void(0);" onClick={() => props.EditGE(games)}><i className="fa fa-pencil"></i></a> <a href="javascript:void(0);"  onClick={() => softDelete(games)} ><i className="fa fa-trash-o"></i></a>
                                </td>

                            </tr>
                        })}
                    </tbody>

                </table>
            </div>
        </div>
        <div id="confirmation" className="overlay">
          <div className="popup">
            <a className="close" href="javascript:void(0);" onClick={closeDeletePopup} >&times;</a>
            <div className="content confirmation">
              <div className="form-group">
                <p><strong>Are you sure?</strong></p>
              </div>
              <div className="form-group">
                <button className="form-control yesbtn"  onClick={deleteRecord} >Yes</button> <button className="form-control nobtn" onClick={closeDeletePopup} >No</button>
              </div>
            </div>
          </div>
        </div>
    </React.Fragment>
}