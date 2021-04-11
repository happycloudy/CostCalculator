import React, {Component} from 'react';
import axios from "axios";
import {ListGroup,Row,Col} from "react-bootstrap";
import MoreInfo from "./MoreInfo";


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
        axios.post('http://c3.team21.ru:8083/removeworker',worker)
            .then( (res)=> {
                this.setState({
                    ...ArrState
                })
            })
            .catch( (err)=> console.log(err))
    }
    async ReloadInfo(){
        await axios.get('http://c3.team21.ru:8083/loadworkerswithcost').then((res) => {
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
                                        {worker.name}
                                    </Col>
                                    <Col>
                                        <MoreInfo worker={worker} ReloadInfo={this.ReloadInfo}/>
                                    </Col>
                                    <Col>
                                        <button className="btn btn-danger" onClick={()=> this.RemoveWorker(worker)}>Удалить сотрудника</button>
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