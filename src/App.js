import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import React from 'react'
import Index from './pages/Index'
import Workers from './pages/Workers'
import Timeline from './pages/Timeline'
import Navigation from './Components/Navigation'

class App extends React.Component{
  render(){
    return (
      <div className="App">

          <Router>
              <Navigation/>
              <div>
                  <Switch>
                      <Route exact path="/">
                          <Index />
                      </Route>
                      <Route path="/workers">
                          <Workers />
                      </Route>
                      <Route path="/timeline">
                          <Timeline />
                      </Route>
                  </Switch>
              </div>
          </Router>
      </div>
    );
  }
}

export default App;
