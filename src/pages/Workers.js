import {Container} from 'react-bootstrap';
import React from 'react'
import WorkersList from "../Components/WorkersList";

class App extends React.Component{
    render(){
        return (
            <div className="App">
                <Container style={{marginTop: '3vh'}}>
                    <WorkersList/>
                </Container>
            </div>
        );
    }
}

export default App;