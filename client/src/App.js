import React from 'react';
import { Login } from './pages/login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
        <div>
          <Switch>
            <Route path="/home">
              <Login />
            </Route>
          </Switch>

        </div>

    </Router>
  );
}

export default App