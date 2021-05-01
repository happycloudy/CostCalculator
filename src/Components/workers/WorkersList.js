import React, {Component} from 'react';
import axios from "axios";
import {ListGroup, Row, Col, Button} from "react-bootstrap";
import MoreInfo from "../sub/MoreInfo";
import SortWorkersDropdown from "./SortWorkersDropdown";


class WorkersList extends Component {
    constructor(props) {
        super(props);
        this.RemoveWorker = this.RemoveWorker.bind(this);
        this.styleList = {
            marginTop: '3vh',
            borderRadius: '10px'
        }
        this.RemoveSpecialty = this.RemoveSpecialty.bind(this);
    }

    async componentDidMount() {
        await this.props.reloadInfo()
    }

    RemoveSpecialty(spec, worker) {
        axios.post('/removeworkerspec', {
            name: worker.name,
            spec: spec
        })
            .then(async _ => {
                await this.props.reloadInfo()
            })
            .catch((err) => console.log(err))
    }

    RemoveWorker(worker) {
        axios.post('/removeworker', worker)
            .then((res) => {
                this.props.reloadInfo()
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <>
                <Row className='mt-3'>
                    <Col>
                        <SortWorkersDropdown setData={(data) => this.props.setData(data)}
                                             data={this.props.data}
                        />
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <ListGroup as="ul" style={this.styleList}>
                    {
                        Object.values(this.props.data).map((worker, ind) => {
                            return (
                                <ListGroup.Item as="li"
                                                key={ind}
                                                variant='secondary'
                                                className='mt-2'
                                                style={this.styleList}>
                                    <Row>
                                        <Col>
                                            <h5>
                                                {worker.name},
                                            </h5>
                                            <h5>
                                                {
                                                    worker.specialty.split('; ').map(spec => {
                                                        return (
                                                            <div className='mt-2'>
                                                                <div style={{textDecoration: 'underline'}}
                                                                     className='d-inline'
                                                                >
                                                                    {spec} ,
                                                                </div>
                                                                <div className='d-inline'
                                                                     onClick={() => this.RemoveSpecialty(spec, worker)}
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
                                            <MoreInfo worker={worker} ReloadInfo={this.props.reloadInfo}/>
                                        </Col>
                                        <Col>
                                            <Button className="btn btn-danger"
                                                    onClick={() => this.RemoveWorker(worker)}>Удалить
                                                сотрудника</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </>
        );
    }
}

export default WorkersList;