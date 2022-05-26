import React from 'react'
import {
    BrowserRouter,
    Route,
    Switch
  } from "react-router-dom";
import Home from './screens/Home';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            </Switch>
        </BrowserRouter>
    )
}
  
  export default App