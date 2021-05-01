import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import React from 'react'
import Index from './pages/Index'
import Workers from './pages/Workers'
import Timeline from './pages/Timeline'
import Taskspage from "./pages/Taskspage";
import Specialties from "./pages/Specialties";
import Results from "./pages/Results";

class App extends React.Component {
    render() {
        return (
            <div className="App min-vh-100">
                <Router>
                    <>
                        <Switch>
                            <Route exact path="/">
                                <Index />
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
                            <Route path='/results'>
                                <Results/>
                            </Route>
                        </Switch>
                    </>
                </Router>
            </div>
        );
    }
}

export default App;
