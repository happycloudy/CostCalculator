import {Col, Row, Button, Dropdown} from 'react-bootstrap';
import React, {Component} from 'react';
import NotNumberToolTipField from "../sub/NotNumberToolTipField";
import AlphabetInput from "../sub/AlphabetInput";
import axios from "axios";

export default class AddWorker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRightPaymentField: false,
            isRightWorkerField: false,
            name: '',
            currentSpecialty: undefined,
            specialties: [],
            cost: '',
        }
        this.setIsRightPaymentField = this.setIsRightPaymentField.bind(this);
        this.setIsRightWorkerField = this.setIsRightWorkerField.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.setCost = this.setCost.bind(this);
    }

    async componentDidMount() {
        await axios.get('/getspecialties').then(res => {
            this.setState({
                specialties: ['Не выбран', ...res.data]
            })
        })
    }

    setIsRightPaymentField(state) {
        this.setState({
            isRightPaymentField: state
        })
    }

    setIsRightWorkerField(state) {
        this.setState({
            isRightWorkerField: state
        })
    }

    setCost(state) {
        this.setState({
            value: state
        })
    }

    async sendForm(e) {
        e.preventDefault()
        if(this.state.currentSpecialty === undefined || this.state.currentSpecialty === 'Не выбран'){
            await this.setState({
                currentSpecialty: ''
            })
        }
        await axios.post("/addworker", {
            WorkerName: this.state.name,
            WorkerCost: this.state.cost,
            WorkerSpecialty: this.state.currentSpecialty
        }).then(async _=>{
            await this.props.reloadInfo()
        })
    }

    render() {
        return (
            <div className="AddWorkerWrap">
                <h3>Добавить сотрудника</h3>
                <form className="AddWorker"
                      action="/addworker"
                      method="POST">
                    <Row>
                        <Col>
                            <h4>
                                Сотрудник
                            </h4>
                            <AlphabetInput setIsRightField={this.setIsRightWorkerField}
                                           className="WorkerField"
                                           name="WorkerName"
                                            parseForm={(e)=>this.setState({name: e.target.value})}
                            />
                        </Col>
                        <Col>
                            <h4>
                                ЗП $/ час
                            </h4>
                            <NotNumberToolTipField name="WorkerCost" value={this.state.cost}
                                                   setIsSubmitted={(isRightPaymentField) => {
                                                       this.setIsRightPaymentField(isRightPaymentField)
                                                   }}
                                                   ParseForm={(e) => {
                                                       this.setState({
                                                           cost: e.target.value
                                                       })
                                                   }}
                            />
                        </Col>
                    </Row>

                    <Row className='mt-5'>
                        <Col>
                            <h4>
                                Выберите специальность или добавьте новую:
                            </h4>
                            <AlphabetInput setIsRightField={this.setIsRightWorkerField}
                                           className="WorkerField"
                                           name="WorkerSpecialty"
                                           isRequest={false}
                                           parseForm={(e)=> {
                                               this.setState({currentSpecialty: e.target.value})
                                           }}
                            />
                        </Col>
                    </Row>


                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" name="name">
                            {
                                this.state.currentSpecialty ? this.state.currentSpecialty : "Добавить роль"
                            }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                this.state.specialties.map((specialty, ind) => {
                                    return <Dropdown.Item key={ind}
                                                          onClick={() => this.setState({currentSpecialty: specialty})}>
                                        {specialty}
                                    </Dropdown.Item>
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    {this.state.isRightPaymentField && this.state.isRightWorkerField ?
                        <Button variant="primary" onClick={async (e) => await this.sendForm(e)} type="submit" className='mt-3 mb-3'>
                            Добавить
                        </Button>
                        :
                        null}
                </form>
            </div>
        )
    }
}