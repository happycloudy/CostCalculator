import React, {Component} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import axios from "axios";

class AddSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialty: ''
        }
        this.addSpecialty = this.addSpecialty.bind(this);
    }

    addSpecialty() {
        axios.post('/addspecialty', {
            specialty: this.state.specialty
        }).then(async _ => {
            await this.props.reloadData()
        })
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <div>Специализация</div>
                        <input className='mt-3' value={this.state.specialties}
                               onChange={(e) => this.setState({
                                   specialty: e.target.value
                               })}
                        />

                        <br/>

                        <Button className='mt-3' onClick={this.addSpecialty}>
                            Добавить
                        </Button>
                    </Col>
                </Row>
            </>
        );
    }
}

export default AddSpecialty;