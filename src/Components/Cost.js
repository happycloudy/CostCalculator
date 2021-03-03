import {Col,Row} from 'react-bootstrap';
import React from 'react';
import 'axios'
import axios from 'axios';
import MoreInfo from './MoreInfo'
// import popper from 'popper'


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
        data.forEach(worker => worker.isExists = true);
        this.setState({
                ...this.state,
                ...data
        })     
    }

    
    RemoveWorker(worker){
        let ArrState = Object.values(this.state)
        ArrState.forEach( (ArrWorker)=>{
            if(worker.name == ArrWorker.name) ArrWorker.isExists = false
        })
        axios.post('/removeworker',worker)
        .then( (res)=> {
            this.setState({
                ...ArrState
            })
            console.log(this.state)
        })
        .catch( (err)=> console.log(err))
    } 


    render(){
        return(
            <div className="CostWrap">
                <h2>
                    Затраты <br /> по сотрудникам
                </h2>
                {Object.values(this.state).map( (worker)=>
                    worker.isExists?       
                    <div key={worker.name}>
                    <Row className="Worker">
                        <Col className="Name">
                            {worker.name}(ЗП {worker.payment}$)
                            <br />{worker.cost}$
                        </Col>
                        <Col className="SpentTime">
                            Суммарно затраченное
                        время:<br />{worker.time} часов
                        </Col>
                    </Row>
                    <Row style={{marginTop: '30px'}}>
                        <Col>
                            <button className="btn btn-primary" onClick={()=> this.RemoveWorker(worker)}>Удалить сотрудника и его задачи</button>
                        </Col>
                        <Col>
                            <MoreInfo worker={worker}/>
                        </Col>
                    </Row>
                    <hr/>
                    </div>:
                    null
                )}
            </div>
        )
    }
}
