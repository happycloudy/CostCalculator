import {Col,Row, Button} from 'react-bootstrap';
import React from 'react'
import axios from 'axios'
import { Hint } from 'react-autocomplete-hint';


export default class AddTask extends React.Component{
  constructor(){
    super()
    this.state = {
      workers: [],
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.RefreshData = this.RefreshData.bind(this)
  }
  
  componentDidMount(){
    this.RefreshData()
  }

  async RefreshData(){
    let data
    await axios.get('/loadworkerswithcost')
    .then( (res)=> {
        data= res.data
    } )
    .catch( (err)=> console.log(err))
    let workers = []
    data.forEach(worker => {
        workers.push(worker.name)
    });
    this.setState({
      workers: workers,
      text: this.state.text
    })
  }

  handleChange(e){
    this.RefreshData()
    this.setState(
      {
        workers: this.state.workers,
        text: e.target.value                    
      })
  }
  render(){
    return(
    <div className="AddTaskWrap">
      <form className="AddTask" action="/addworkertask" method="POST">
        <h2>
          Добавить задание
        </h2>
        <Row>
          <Col>
              <h3>Сотрудник</h3>
              <div style={{display:'flex', alignItems:'center', justifyContent: 'center'}}>
                <Hint options={this.state.workers} allowTabFill className="WorkerField">
                  <input className="WorkerField" value={this.state.text} onChange={e=> this.handleChange(e)} name="name" required/>
                </Hint>
              </div>
          </Col>

          <Col>
              <h3>Задание</h3>
              <input className="Task" name="task" required/>
          </Col>
          <Col>
              <h3>Время на задачу </h3>
              <input className="TimeForTask" name="time" required/>
          </Col>
        </Row>
        <Button variant="primary" type="submit" style={{marginTop: "30px"}} >
          Добавить задание
        </Button>
      </form>
    </div>)
  }
}