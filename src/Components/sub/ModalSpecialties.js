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
        this.reloadInfo = this.reloadInfo.bind(this);
        this.addSpeciaty = this.addSpeciaty.bind(this);
    }

    async componentDidMount() {
        this.reloadInfo()
    }

    reloadInfo() {
        axios.get('/getspecialties').then(res => {
            let workersSpecs = this.state.worker.specialty.split('; ')
            let specs = []

            res.data.forEach(spec => {
                if(!workersSpecs.find(workerSpec => workerSpec === spec)) specs.push(spec)
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
        })
        this.reloadInfo()
    }

    render() {
        let workersSpecialties = this.state.worker.specialty.split(';')
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
                                <Button className='mt-3'
                                        onClick={async () => {
                                            await this.setState({currentSpecialty: spec})
                                            await this.addSpeciaty()
                                            await this.reloadInfo()
                                        }}
                                        key={spec}
                                >
                                    {spec}
                                </Button>
                            )
                        }
                    </ListGroup>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalSpecialties;

