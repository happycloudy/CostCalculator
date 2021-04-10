import {Container} from 'react-bootstrap';
import AddWorker from '../Components/AddWorker'
import AddTask from '../Components/AddTask'
import Cost from '../Components/Cost'
import React from 'react'

class App extends React.Component{
    render(){
        return (
            <div className="App">
                <Container>
                    <AddWorker/>
                    <AddTask/>
                    <Cost/>
                </Container>
            </div>
        );
    }
}

export default App;
