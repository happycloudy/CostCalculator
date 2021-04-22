import React from 'react';
import {Button, ListGroup, Modal} from "react-bootstrap";
import axios from "axios";

class ModalSpecialties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
            currentSpecialty: '',
            worker: this.props.worker,
            isActive: true
        }
    }

    async componentDidMount() {
        axios.get('/getspecialties').then(res => {
            this.setState({
                specialties: res.data
            })
        })
    }

    addSpeciaty() {
        axios.post('/addworkerspecialty', {
            worker: this.state.worker.name,
            specialty: this.state.currentSpecialty
        })
    }

    render() {
        let workersSpecialties = this.state.worker.specialty.split(';')
        return (
            <Modal show={this.props.showSpec} onHide={() => {
                this.props.setShowSpec(false)
                this.props.setShow(true)
            }} centered>
                <Modal.Header>
                    <h4>
                        Специализации:
                    </h4>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <ListGroup>
                        {
                            this.state.specialties.map(spec => {
                                    let specExist = workersSpecialties.find(workerSpec => workerSpec === spec)
                                    if (specExist === undefined)
                                        return (
                                            this.state.isActive?
                                                <Button className='mt-3'
                                                        onClick={async () => {
                                                            await this.setState({currentSpecialty: spec, isActive: false})
                                                            this.addSpeciaty()
                                                        }}
                                                        key={spec}
                                                >
                                                    {spec}
                                                </Button>:
                                                <Button className='mt-3'
                                                        onClick={async () => {
                                                            await this.setState({currentSpecialty: spec, isActive: false})
                                                            this.addSpeciaty()
                                                        }}
                                                        key={spec}
                                                        disabled
                                                >
                                                    {spec}
                                                </Button>
                                        )
                                }
                            )
                        }
                    </ListGroup>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalSpecialties;

