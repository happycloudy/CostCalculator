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
import Taskspage from "./pages/Taskspage";
import Specialties from "./pages/Specialties";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Navigation/>
                    <div>
                        <Switch>
                            <Route exact path="/">
                                <Index/>
                            </Route>
                            <Route path="/workers">
                                <Workers/>
                            </Route>
                            <Route path="/timeline">
                                <Timeline/>
                            </Route>
                            <Route path='/taskspage'>
                                <Taskspage/>
                            </Route>
                            <Route path='/specialties'>
                                <Specialties/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
