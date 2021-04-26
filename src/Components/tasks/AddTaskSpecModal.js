import {Button, ListGroup, Modal} from "react-bootstrap";
import {Component} from "react";
import axios from "axios";

class AddTaskSpecModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: []
        }
        this.sortWithSpecialty = this.sortWithSpecialty.bind(this);
    }

    componentDidMount() {
        axios.get('/getspecialties').then(res => {
            this.setState({
                specialties: res.data
            })
        })
    }

    sortWithSpecialty(spec) {
        axios.post('/sorttaskwthspec', {
            name: this.props.task.name,
            task: this.props.task.task,
            time: this.props.task.time,
            StartTime: this.props.task.StartTime,
            EndTime: this.props.task.EndTime,
            specialty: spec
        }).then(_ => {
            this.props.reload()
            this.props.handleClose()
        })
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Распределить по специальности: </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            {
                                this.state.specialties.map((spec, id) =>
                                    <Button className='mt-3'
                                            onClick={ ()=> this.sortWithSpecialty(spec) }
                                    >
                                        {spec}
                                    </Button>
                                )
                            }
                        </ListGroup>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default AddTaskSpecModal