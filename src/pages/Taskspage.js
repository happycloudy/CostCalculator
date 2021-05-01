import {Container} from 'react-bootstrap';
import React from 'react'
import Tasks from "../Components/tasks/Tasks";
import BackBtn from "./BackBtn";

class App extends React.Component{
    render(){
        return (
            <div className="App">
                <Container>
                    <BackBtn/>
                    <Tasks/>
                </Container>
            </div>
        );
    }
}

export default App;
