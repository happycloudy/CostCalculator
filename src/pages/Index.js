import {Col, Container, Row} from 'react-bootstrap';
import React from 'react';
import LinkCard from "./LinkCard";

const Index = () => {
    return (
        <Container className='h-75' style={{overflow: 'hidden'}} >
            <Row style={{marginTop:'20vh'}}></Row>
            <Row className='h-75'>
                <Col className='align-self-center'>
                    <Row>
                        <Col className='d-flex justify-content-center'>
                            <LinkCard text='Сотрудники' link='/workers'/>
                        </Col>
                        <Col className='d-flex justify-content-center'>
                            <LinkCard text='Таймлайн' link='/timeline'/>
                        </Col>
                    </Row>

                    <Row className='mt-5'>
                        <Col className='d-flex justify-content-center'>
                            <LinkCard text='Задания' link='/taskspage'/>
                        </Col>
                        <Col className='d-flex justify-content-center'>
                            <LinkCard text='Специальности' link='/specialties'/>
                        </Col>
                    </Row>

                    <Row className='mt-5'>
                        <Col className='d-flex justify-content-center'>
                            <LinkCard text='Результаты' link='/results'/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Index;
