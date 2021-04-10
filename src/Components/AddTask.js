import {Col, Row, Button, Dropdown} from 'react-bootstrap';
import React from 'react'
import axios from 'axios'
import moment from 'moment'

import NotNumberToolTipField from './NotNumberToolTipField'


export default class AddTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentWorker: undefined,
            currentSpecialty: undefined,
            workers: [],
            specialties: [],
            task: '',
            name: '',
            time: '',
            isSubmitted: false,
            isAlphabetFieldRight: false,
            isOverWorkRequest: false,
            isSpecialtyRequest: false
        }
        this.RefreshData = this.RefreshData.bind(this)
        this.setIsSubmitted = this.setIsSubmitted.bind(this)
        this.SendWorkerTask = this.SendWorkerTask.bind(this)
        this.ParseForm = this.ParseForm.bind(this);
    }

    componentDidMount() {
        this.RefreshData()
    }

    async RefreshData() {
        let data
        await axios.get('/loadworkerswithcost')
            .then((res) => {
                data = res.data
            })
            .catch((err) => console.log(err))
        let workers = []
        data.forEach(worker => {
            workers.push(worker.name)
        });
        this.setState({
            workers: workers
        })

        await axios.get('/getspecialties').then(res=>{
            this.setState({
                specialties: ['Не выбран',...res.data]
            })
        })
    }

    async setIsSubmitted(isSubmitted){
        await this.setState({
            isSubmitted: isSubmitted
        })
    }

    async SendWorkerTask(e){
        e.preventDefault()
        let StartDate = new Date()
        let EndDate = await moment(new Date()).add(this.state.time,'days')
        await axios.post("/addworkertask",{
            name: this.state.currentWorker,
            task: this.state.task,
            time: this.state.time,
            isSpecialtyRequest: this.state.isSpecialtyRequest,
            isOverWorkRequest: this.state.isOverWorkRequest,
            StartTime: `${StartDate.getFullYear()}-${StartDate.getMonth()}-${StartDate.getDate()}`,
            EndTime: `${EndDate.year()}-${EndDate.month()}-${EndDate.date()}`,
            isChooseBtwSp: this.state.currentSpecialty
        })
    }

    ParseForm(e){
        let field = e.target.name
        if( field === 'name') this.setState({
            name: e.target.value
        })
        if( field === 'task') this.setState({
            task: e.target.value
        })
        if( field === 'time') this.setState({
            time: e.target.value
        })
        if (field === 'isSpecialtyRequest') this.setState({
            isSpecialtyRequest: !this.state.isSpecialtyRequest
        })
        if (field === 'isOverWorkRequest') this.setState({
            isOverWorkRequest: !this.state.isSpecialtyRequest
        })
    }
    setIsRightField(isRightField){
        this.setState({isAlphabetFieldRight: isRightField})
    }

    render() {
        return (
            <div className="AddTaskWrap">
                <form className="AddTask"  method="POST" onSubmit={(e)=> this.SendWorkerTask(e)}>
                    <h2>
                        Добавить задание
                    </h2>
                    <Row>
                        <Col>
                            <h3>
                                Сотрудник
                            </h3>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" name="name">
                                    {
                                        this.state.currentWorker? this.state.currentWorker: "Добавить сотрудника"
                                    }
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        this.state.workers.map((worker,ind)=>{
                                            return <Dropdown.Item key={ind} onClick={()=> this.setState({currentWorker: worker}) }>{worker}</Dropdown.Item>
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        <Col>
                            <h3>Задание</h3>
                            <input className="Task" name="task" onChange={this.ParseForm} value={this.state.task} required/>
                        </Col>

                        <Col>
                            <h3>Дней на задачу </h3>
                            <NotNumberToolTipField ParseForm={this.ParseForm} name="time" value={this.state.time} setIsSubmitted={ (isSubmitted)=>{this.setIsSubmitted(isSubmitted)}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 style={{marginTop: '2vh'}}>Не учитывать специализацию?</h5>
                             <input type='checkbox' onChange={this.ParseForm} name='isSpecialtyRequest'/>  {/* поменять стиль*/}
                        </Col>
                        <Col>
                            <h5 style={{marginTop: '2vh'}}>Добавить переработку?</h5><small>(рабочее время повышается до 12)</small> <br/>
                            <input type='checkbox' onChange={this.ParseForm} name='isOverWorkRequest'/>  {/* поменять стиль*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>
                                Добавить для определенной роли:<br/>
                                <small>
                                    (не выбирать, если не нужно добавлять определенной группе)
                                </small>
                            </h5>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" name="name">
                                    {
                                        this.state.currentSpecialty? this.state.currentSpecialty: "Добавить роль"
                                    }
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        this.state.specialties.map((specialty,ind)=>{
                                            return <Dropdown.Item key={ind} onClick={()=> this.setState({currentSpecialty: specialty}) }>{specialty}</Dropdown.Item>
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {this.state.isSubmitted?
                        <Button variant="primary" type="submit" style={{marginTop: "30px"}}>
                        Добавить задание
                        </Button>
                    :
                    null}
                </form>
            </div>)
    }
}