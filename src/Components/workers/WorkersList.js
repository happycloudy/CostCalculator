import React, {Component} from 'react';
import axios from "axios";
import {ListGroup, Row, Col} from "react-bootstrap";
import SortWorkersDropdown from "./SortWorkersDropdown";
import Worker from "./Worker";


class WorkersList extends Component {
    constructor(props) {
        super(props);
        this.RemoveWorker = this.RemoveWorker.bind(this);
        this.styleList = {
            marginTop: '3vh',
            borderRadius: '10px'
        }
        this.state = {
            data: []
        }
        this.RemoveSpecialty = this.RemoveSpecialty.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    async componentDidMount() {
        await this.refreshData()
    }

    async refreshData(){
        this.setState({data: this.props.data})
        await this.props.reloadInfo()
    }

    async RemoveSpecialty(spec, worker) {
        axios.post('/removeworkerspec', {
            name: worker.name,
            spec: spec
        })
            .then(async _ => {
                await this.refreshData()
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
                                             reloadInfo={this.props.reloadInfo}
                        />
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <ListGroup as="ul" style={this.styleList}>
                    {
                        Object.values(this.props.data).map((worker, ind) => {
                            return (
                                <Worker worker={worker}
                                        key={ind}
                                        reloadInfo={this.props.reloadInfo}
                                        RemoveSpecialty={async (spec,worker) => this.RemoveSpecialty(spec, worker)}
                                        RemoveWorker={(worker)=> this.RemoveWorker(worker)}

                                />
                            )
                        })
                    }
                </ListGroup>
            </>
        );
    }
}

export default WorkersList;