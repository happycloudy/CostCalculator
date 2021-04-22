import {Container} from 'react-bootstrap';
import AddWorker from '../Components/index/AddWorker'
import AddTask from '../Components/index/AddTask'
import Cost from '../Components/index/Cost'
import React from 'react'
import axios from "axios";

class Index extends React.Component{
    render(){
        return (
            <div className="App">
                <Container>
                    <AddWorker/>
                    {/*<AddTask/>*/}
                    <Cost ReloadInfo={this.ReloadData}/>
                </Container>
            </div>
        );
    }
}

export default Index;
