import {Button, Col, Container, Row} from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import MoreInfo from '../sub/MoreInfo'


export default class Cost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.RemoveWorker = this.RemoveWorker.bind(this)
        this.ReloadInfo = this.ReloadInfo.bind(this)
    }

    async componentDidMount() {
        let data
        await axios.get('/loadworkerswithcost')
            .then((res) => {
                data = res.data
            })
            .catch((err) => console.log(err))
        data.forEach(worker => {
            worker.isExists = true
            worker.tasks.forEach(task => {
                task.isExists = true
            })
        });
        this.setState({
            ...this.state,
            ...data
        })
    }

    ReloadInfo() {
        let data
        axios.get('/loadworkerswithcost')
            .then((res) => {
                data = res.data
                data.forEach(worker => {
                    worker.isExists = true
                    worker.tasks.forEach(task => {
                        task.isExists = true
                    })
                });
                this.setState({
                    ...this.state,
                    ...data
                })
            })
            .catch((err) => console.log(err))
    }


    RemoveWorker(worker) {
        let ArrState = Object.values(this.state)
        ArrState.forEach((ArrWorker) => {
            if (worker.name === ArrWorker.name) ArrWorker.isExists = false
        })
        axios.post('/removeworker', worker)
            .then((res) => {
                this.setState({
                    ...ArrState
                })
            })
            .catch((err) => console.log(err))
    }


    render() {
        return (
            <div className="CostWrap">
                <h4>
                    Затраты <br/> по сотрудникам
                </h4>
                <Row>
                    <Col>
                        <Button className='mt-3' onClick={this.ReloadInfo}>
                            Обновить
                        </Button>
                    </Col>
                </Row>
                {Object.values(this.state).map((worker) =>
                    worker.isExists ?
                        <div key={worker.name}>
                            <Container>
                                <hr/>
                                <Row className="Worker">
                                    <Col className="Name">
                                        {worker.name}(ЗП {worker.payment}$ , {worker.specialty})
                                        <br/>{worker.cost}$
                                    </Col>
                                    <Col className="SpentTime">
                                        Суммарно затраченное
                                        время:<br/>{worker.time} дней
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '30px'}}>
                                    <Col>
                                        <button className="btn btn-danger" onClick={() => this.RemoveWorker(worker)}>Удалить
                                            сотрудника и его задачи
                                        </button>
                                    </Col>
                                    <Col>
                                        <MoreInfo worker={worker} ReloadInfo={this.ReloadInfo}/>
                                    </Col>
                                </Row>
                                <hr/>
                            </Container>
                        </div> :
                        null
                )}
            </div>
        )
    }
}
