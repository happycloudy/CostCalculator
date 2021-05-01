import React from 'react';
import {Button, Col, ListGroup, Row} from "react-bootstrap";
import MoreInfo from "../sub/MoreInfo";
import axios from "axios";

class Worker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: []
        }
        this.getSpecialties = this.getSpecialties.bind(this);
    }

    async componentDidMount() {

    }

    getSpecialties = async () => {
        await axios.get('/getspecialties').then(async res => {
            let workersSpecs = this.props.worker.specialty.split('; ')
            let specs = []
            await res.data.forEach(spec => {
                if (!workersSpecs.find(workerSpec => workerSpec === spec)) specs.push(spec)
            })
            await this.setState({specialties: specs})
        })
    }

    render() {
        const styleList = {
            marginTop: '3vh',
            borderRadius: '10px'
        }

        return (
            <>
                <ListGroup.Item as="li"
                                variant='secondary'
                                className='mt-2'
                                style={styleList}>
                    <Row>
                        <Col>
                            <h5>
                                {this.props.worker.name},
                            </h5>
                            <h5>
                                {
                                    this.props.worker.specialty.split('; ').map(spec => {
                                        return (
                                            <div className='mt-2' key={spec}>
                                                <div style={{textDecoration: 'underline'}}
                                                     className='d-inline'
                                                >
                                                    {spec} ,
                                                </div>
                                                <div className='d-inline'
                                                     onClick={async () => {
                                                         await this.props.RemoveSpecialty(spec, this.props.worker)
                                                         await this.getSpecialties()
                                                     }}
                                                >
                                                    ❌
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </h5>
                        </Col>
                        <Col>
                            <MoreInfo worker={this.props.worker}
                                      ReloadInfo={this.props.reloadInfo}
                                      getSpecialties={this.getSpecialties}
                                      specialties={this.state.specialties}
                                      active={true}
                            />
                        </Col>
                        <Col>
                            <Button className="btn btn-danger"
                                    onClick={() => this.props.RemoveWorker(this.props.worker)}>Удалить
                                сотрудника</Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </>
        );
    }
}

export default Worker;