import {Container} from 'react-bootstrap';
import AddWorker from '../Components/AddWorker'
import AddTask from '../Components/AddTask'
import Cost from '../Components/Cost'
import React from 'react'
import Navigation from '../Components/Navigation'

class App extends React.Component{
    render(){
        return (
            <div className="App">
                <Container>
                    <Navigation/>
                    <AddWorker/>
                    <AddTask/>
                    <Cost/>
                </Container>
            </div>
        );
    }
}

export default App;
