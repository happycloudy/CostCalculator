import {Container} from 'react-bootstrap';
import React from 'react'
import Navigation from '../Components/Navigation'

class App extends React.Component{
    render(){
        return (
            <div className="App">
                <Container>
                    <Navigation/>
                    Работники
                </Container>
            </div>
        );
    }
}

export default App;