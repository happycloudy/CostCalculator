import React from 'react';
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import axios from "axios";
import AddSpecialty from "./AddSpecialty";

class SpecialtiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: []
        }
        this.reloadData = this.reloadData.bind(this);
        this.removeSpec = this.removeSpec.bind(this);
        this.style = {
            background: 'white',
            borderRadius: '10px'
        }
    }

    async componentDidMount() {
        await this.reloadData()
    }
    
    async reloadData(){
        await axios.get('/getspecialties').then(res => {
            this.setState({
                specialties: res.data
            })
        })
    }

    async removeSpec(spec){
        await axios.post('/removespecialty',{specialty: spec}).then(async res=>{
            await this.reloadData()
        })
    }

    render() {
        return (
            <div style={this.style}>
                <Container>
                    <Row className='mt-5'></Row>
                    <Row>
                        <Col>
                            <h4>
                                Специальности
                            </h4>
                        </Col>
                    </Row>
                    <ListGroup className='mt-4'>
                        {
                            this.state.specialties.map(spec => {
                                return (
                                    <ListGroup.Item variant='dark' key={spec} className='mt-3' style={{borderRadius: '10px'}}>
                                        <Row>
                                            <Col>
                                                <h4>
                                                    {spec}
                                                </h4>
                                            </Col>
                                            <Col>
                                                <Button variant='danger' onClick={ async ()=> await this.removeSpec(spec) }>
                                                    Удалить {spec}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                    <Row className='mt-5'>
                        <Col>
                            <h4>
                                Добавить специализацию
                            </h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AddSpecialty reloadData={this.reloadData}/>
                        </Col>
                    </Row>
                    <Row className='mt-5'></Row>
                </Container>
            </div>
        );
    }
}

export default SpecialtiesList;