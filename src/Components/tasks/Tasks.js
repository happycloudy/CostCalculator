import React from 'react';
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import axios from "axios";
import TaskLi from "./TaskLi";
import AddTask from "../tasks/AddTask";
import ReloadButton from "../sub/ReloadButton";

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
        this.ReloadData = this.ReloadData.bind(this);
        this.style = {
            background: 'white',
            borderRadius: '10px'
        }
    }

    async componentDidMount() {
        await this.ReloadData()
    }

    async ReloadData(){
        await axios.get('/getworkerstasks').then(res => {
            this.setState(state=>{
                let tasks = []
                res.data.forEach(worker=>{
                    worker.tasks.forEach(task=> tasks.push({
                        ...task,
                        name: worker.name
                    }))
                })
                return {
                    tasks: tasks
                }
            })
        })
    }

    render() {
        return (
            <div style={this.style}>
                <Container>
                    <Row className='mt-5'></Row>
                    <Row>
                        <Col>
                            <h3>
                                Задания
                            </h3>
                        </Col>
                    </Row>
                    <ReloadButton className='mt-3' reload={this.ReloadData}/>
                    <ListGroup className='mt-5'>
                        {
                            this.state.tasks.map((task,ind)=>{
                                return (
                                    <TaskLi reload={this.ReloadData} task={task} key={ind}/>
                                )
                            })
                        }
                    </ListGroup>
                    <hr className='mt-5'/>
                    <AddTask/>
                    <Row className='mt-5'></Row>
                </Container>
            </div>
        )
    }
}

export default Tasks;