import React from 'react';
import {ListGroup, Modal} from "react-bootstrap";
import axios from "axios";
import TaskBtn from "./TaskBtn";

class ChooseTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
        this.getTasks = this.getTasks.bind(this);
    }

    async componentDidMount() {
        await this.getTasks()
    }

    getTasks = async () => {
        await axios.get('/getworkerstasks').then(res=>{
            res.data.forEach(worker=>{
                if(worker.name === 'Свободно'){
                    this.setState({
                        tasks: worker.tasks
                    })
                }
            })
            if(!res.data.find(worker=> worker.name === 'Свободно'))
                this.setState({
                    tasks: []
                })
        })
    }

    render() {
        return (
            <Modal show={this.props.showTasks} onHide={async () => {
                this.props.setShowTasks(false)
                this.props.setShow(true)
                this.props.reloadInfo()
                await this.getTasks()
            }} centered>
                <Modal.Header>
                    <h4>
                        Задания:
                    </h4>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <ListGroup>
                        {
                            this.state.tasks.map((task, id) =>
                                <TaskBtn task={task} key={id} worker={this.props.worker} reloadInfo={this.getTasks}/>
                            )
                        }
                    </ListGroup>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ChooseTaskModal;