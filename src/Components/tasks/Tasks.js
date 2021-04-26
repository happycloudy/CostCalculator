import React from 'react';
import {Button, ListGroup} from "react-bootstrap";
import axios from "axios";
import TaskLi from "./TaskLi";
import AddTask from "../tasks/AddTask";

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
        this.ReloadData = this.ReloadData.bind(this);
    }

    componentDidMount() {
        this.ReloadData()
    }

    ReloadData(){
        axios.get('/getworkerstasks').then(res => {
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
            <>
                <Button className='mt-3' onClick={this.ReloadData}>Обновить</Button>
                <ListGroup className='mt-5'>
                    {
                        this.state.tasks.map((task,ind)=>{
                            return (
                                <TaskLi reload={this.ReloadData} task={task} key={ind}/>
                            )
                        })
                    }
                </ListGroup>
                <AddTask/>
            </>
        )
    }
}

export default Tasks;