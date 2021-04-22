import {Container} from 'react-bootstrap';
import React from 'react'
import Tasks from "../Components/tasks/Tasks";

class App extends React.Component{
    render(){
        return (
            <div className="App">
                <Container>
                    <Tasks/>
                </Container>
            </div>
        );
    }
}

export default App;
