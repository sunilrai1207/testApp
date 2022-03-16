import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import  Login from  "../login"
import GamesEdition from "../gamesEdition";
import FunctionalArea from "../functionalArea";
import PageNotFound from "../pagenotfound";
import {isLoginUser} from "../helpers/common"
function Routes(){
  const isLogin = isLoginUser();
  
    return <Router>
    <Switch>  
      <Route exact path="/" component={Login}></Route>      
      <Route path="/gamesedition" component={GamesEdition}></Route>
      <Route path="/functionalarea" component={FunctionalArea}></Route>
      <Routes path='*'  component={PageNotFound}></Routes> 
    </Switch>
  </Router>
}

export default Routes;