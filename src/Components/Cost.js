import {Col,Row} from 'react-bootstrap';
import React from 'react';
import 'axios'
import axios from 'axios';
export default class Cost extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {}
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
    render(){
        return(
            <div className="CostWrap">
                <h2>
                    Затраты <br /> по сотрудникам
                </h2>

                {Object.values(this.state).map( (worker)=>       
                    <div>
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
                    <hr />
                    </div>
                )}
            </div>
        )
    }
}
