import React, {Component} from 'react';
import axios from "axios";
import {ListGroup, Row, Col, Button} from "react-bootstrap";
import MoreInfo from "../sub/MoreInfo";


class WorkersList extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
        this.ReloadInfo = this.ReloadInfo.bind(this);
        this.RemoveWorker = this.RemoveWorker.bind(this);
    }

    async componentDidMount() {
        await this.ReloadInfo()
    }

    RemoveWorker(worker){
        let ArrState = Object.values(this.state)
        ArrState.forEach( (ArrWorker)=>{
            if(worker.name === ArrWorker.name) ArrWorker.isExists = false
        })
        axios.post('/removeworker',worker)
            .then( (res)=> {
                this.setState({
                    ...ArrState
                })
            })
            .catch( (err)=> console.log(err))
    }
    async ReloadInfo(){
        await axios.get('/loadworkerswithcost').then((res) => {
            this.setState({
                data: res.data
            })
        }).catch(err => console.log(err))
    }
    render() {
        return (
            <ListGroup as="ul">
                {
                    Object.values(this.state.data).map((worker, ind) => {
                        return (
                            <ListGroup.Item as="li" key={ind}>
                                <Row>
                                    <Col>
                                        {worker.name}, {worker.specialty}
                                    </Col>
                                    <Col>
                                        <MoreInfo worker={worker} ReloadInfo={this.ReloadInfo}/>
                                    </Col>
                                    <Col>
                                        <Button className="btn btn-danger" onClick={()=> this.RemoveWorker(worker)}>Удалить сотрудника</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        );
    }
}

export default WorkersList;