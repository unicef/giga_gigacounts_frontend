import React from 'react'
import {
    BrowserRouter,
    Route,
    Switch
  } from "react-router-dom";
import Dashboard from './screens/Dashboard';
import Login from './screens/Login/index';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            </Switch>
        </BrowserRouter>
    )
}
  
  export default App