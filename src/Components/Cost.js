import {Col,Row} from 'react-bootstrap';
import React from 'react';
import 'axios'
import axios from 'axios';
export default class Cost extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {}
        this.RemoveWorker = this.RemoveWorker.bind(this)
    }    
    
    async componentDidMount(){
        let data
        await axios.get('/loadworkerswithcost')
        .then( (res)=> data= res.data )
        .catch( (err)=> console.log(err))
        this.setState({
            ...this.state,
            ...data
        })   
        console.log(this.state)     
    }

    async RemoveWorker(worker){
        let data
        await axios.post('/removeworker',worker)
        .then( (res)=> data = res.data )
        .catch( (err)=> console.log(err))
        console.log(data);
    }
    render(){
        return(
            <div className="CostWrap">
                <h2>
                    Затраты <br /> по сотрудникам
                </h2>

                {Object.values(this.state).map( (worker,index)=>       
                    <div key={worker.name}>
                    <Row className="Worker">
                        <Col className="Name">
                            {worker.name}
                            <br />{worker.cost}$
                        </Col>
                        <Col className="SpentTime">
                            Суммарно затраченное
                        время:<br />{worker.time} часов
                        </Col>
                    </Row>
                    <div className="moreInfo">
                        Подробнее...
                    </div>
                    <button className="btn btn-primary" onClick={()=> this.RemoveWorker(worker)}>Удалить сотрудника и его задачи</button>
                    <hr/>
                    </div>
                )}
            </div>
        )
    }
}
