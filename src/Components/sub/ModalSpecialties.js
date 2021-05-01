import React from 'react';
import {ListGroup, Modal} from "react-bootstrap";
import axios from "axios";
import ModalSpecBtn from "./ModalSpecBtn";

class ModalSpecialties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSpecialty: '',
            worker: {
                specialty: []
            },
            active: true
        }
        this.addSpeciaty = this.addSpeciaty.bind(this);
        this.refreshSpecialties = this.refreshSpecialties.bind(this);
    }

    async componentDidMount() {
        await this.refreshSpecialties()
    }

    async refreshSpecialties(){
        await this.props.reloadInfo()
        await this.props.getSpecialties()
        await this.setState({
            worker: this.props.worker
        })
    }

    addSpeciaty() {
        axios.post('/addworkerspecialty', {
            worker: this.state.worker.name,
            specialty: this.state.currentSpecialty
        }).then(async _ => {
            await this.props.reloadInfo()
            await this.refreshSpecialties()
        })
    }

    render() {
        return (
            <Modal show={this.props.showSpec} onHide={() => {
                this.props.setShowSpec(false)
                this.props.setShow(true)
                this.props.reloadInfo()
            }} centered>
                <Modal.Header>
                    <h4>
                        Специализации:
                    </h4>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <ListGroup>
                        {
                            this.props.specialties.map(spec =>
                                <ModalSpecBtn setSpec={() => this.setState({currentSpecialty: spec})}
                                              addSpecialty={this.addSpeciaty}
                                              reloadInfo={this.props.reloadInfo}
                                              spec={spec}
                                              key={spec}
                                />
                            )
                        }
                    </ListGroup>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalSpecialties;

