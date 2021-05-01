import React from 'react';
import {Button, ListGroup, Modal} from "react-bootstrap";
import axios from "axios";
import ModalSpecBtn from "./ModalSpecBtn";

class ModalSpecialties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
            currentSpecialty: '',
            worker: {
                specialty: []
            },
            active: true
        }
        this.reloadInfo = this.reloadInfo.bind(this);
        this.addSpeciaty = this.addSpeciaty.bind(this);
    }

    async componentDidMount() {
        await this.props.reloadInfo()
        await this.reloadInfo()
    }

    async reloadInfo() {
        await this.setState({
            worker: this.props.worker
        })
        await axios.get('/getspecialties').then(res => {
            let workersSpecs = this.state.worker.specialty.split('; ')
            let specs = []

            res.data.forEach(spec => {
                if (!workersSpecs.find(workerSpec => workerSpec === spec)) specs.push(spec)
            })
            this.setState({
                specialties: specs
            })
        })
    }

    addSpeciaty() {
        axios.post('/addworkerspecialty', {
            worker: this.state.worker.name,
            specialty: this.state.currentSpecialty
        }).then(async _ => {
            await this.props.reloadInfo()
            await this.reloadInfo()
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
                            this.state.specialties.map(spec =>
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

