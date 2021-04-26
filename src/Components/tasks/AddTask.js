import React, {Component} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import moment from "moment";
import axios from "axios";

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
            startTime: new Date(),
            endTime: '',
            time: 0,
            isOverWorked: false
        }
        this.handleCheckboxOW = this.handleCheckboxOW.bind(this);
        this.addTask = this.addTask.bind(this);
        this.handleTask = this.handleTask.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
    }

    async handleTask(e){
        this.setState({
            task: e.target.value
        })
    }

    async handleStartDate(e){
        await this.setState({
            startTime: e.target.value
        })
    }

    async handleEndDate(e){
        let endDate = await moment(this.state.startTime).add(e.target.value,'days')
        await this.setState({
            time: e.target.value,
            endTime: `${endDate.year()}-${endDate.month()}-${endDate.date()}`
        })
    }

    async handleCheckboxOW(){
        await this.setState({
            isOverWorked: !this.state.isOverWorked
        })
    }

    async addTask(){
        let StartDate = new Date(this.state.startTime)
        await axios.post("/addworkertask",{
            name: 'Свободно',
            task: this.state.task,
            time: this.state.time,
            isSpecialtyRequest: false,
            isOverWorkRequest: this.state.isOverWorked,
            StartTime: `${StartDate.getFullYear()}-${StartDate.getMonth()}-${StartDate.getDate()}`,
            EndTime: this.state.endTime,
            isChooseBtwSp: undefined
        }).then(res=> {
            console.log(res.data)
        })
    }

    render() {
        return (
            <>
                <Row className='mt-5'>
                    <Col>
                        <h4>
                            Добавить задание
                        </h4>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col>
                        <h5>
                            Задание
                        </h5>
                        <input required onChange={this.handleTask} value={this.state.task}/>
                    </Col>

                    <Col>
                        <h5>
                            День начала задачи
                        </h5>
                        <input type='date' onChange={(e)=> this.handleStartDate(e)}/>
                    </Col>

                    <Col>
                        <h5>
                            Дней на задачу
                        </h5>
                        <input type='number' required onChange={(e) => this.handleEndDate(e)}/>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col>
                        <h5>
                            Нужна ли переработка по данному заданию?
                        </h5>
                        <input type={'checkbox'} onClick={this.handleCheckboxOW} />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <Button onClick={this.addTask}>
                            Добавить
                        </Button>
                    </Col>
                </Row>
            </>
        );
    }
}

export default AddTask;