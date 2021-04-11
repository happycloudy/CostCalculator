import {Col,Row} from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import MoreInfo from './MoreInfo'


export default class Cost extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
        this.RemoveWorker = this.RemoveWorker.bind(this)
        this.ReloadInfo = this.ReloadInfo.bind(this)
    }    
    
    async componentDidMount(){
        let data
        await axios.get('/loadworkerswithcost')
        .then( (res)=> {
            data= res.data
        } )
        .catch( (err)=> console.log(err))
        data.forEach(worker => {
            worker.isExists = true
            worker.tasks.forEach( task =>{
                task.isExists = true
            })
        });
        this.setState({
                ...this.state,
                ...data
        })
    }

    ReloadInfo(){
        let data 
        axios.get('/loadworkerswithcost')
        .then( (res)=> {
            data= res.data
            data.forEach(worker => {
                worker.isExists = true
                worker.tasks.forEach( task =>{
                    task.isExists = true
                })
            });
            this.setState({
                    ...this.state,
                    ...data
            }) 
        })
        .catch( (err)=> console.log(err))
        axios.get('/getworkerstasks').then(res=>{
            console.log(res.data)
        })
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
                            {worker.name}(ЗП {worker.payment}$ , {worker.specialty})
                            <br />{worker.cost}$
                        </Col>
                        <Col className="SpentTime">
                            Суммарно затраченное
                        время:<br />{worker.time} дней
                        </Col>
                    </Row>
                    <Row style={{marginTop: '30px'}}>
                        <Col>
                            <button className="btn btn-danger" onClick={()=> this.RemoveWorker(worker)}>Удалить сотрудника и его задачи</button>
                        </Col>
                        <Col>
                            <MoreInfo worker={worker} ReloadInfo={this.ReloadInfo}/>
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
