import React, { useState, useMemo } from 'react';
import { Login } from './pages/login';
import { Respond } from './pages/respond';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { UserContext } from "./UserContext"


function App() {
const [verify, setVerify] = useState(null);
const providerValue = useMemo(() => ({verify, setVerify}), [verify, setVerify])

  return (
    <Router>
      
          <Switch>
            <UserContext.Provider value={{ verify, setVerify}}>
            <Route path="/respond"><Respond /></Route>
            <Route path="/home"><Login /></Route>
            
            </UserContext.Provider>
            
           
          </Switch>
      <div><nav><ul><li><Link to="/home">Home</Link></li></ul></nav></div>
      <div><nav><ul><li><Link to="/respond">Respond</Link></li></ul></nav></div> 

    </Router>
  );
}

export default App