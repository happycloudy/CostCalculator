import React from 'react';
import ResultsWindow from '../Components/index/Results';
import {Container, Row} from "react-bootstrap";
import BackBtn from "./BackBtn";

const Results = () => {
    return (
        <div>
            <Row className='mt-5'></Row>
            <BackBtn/>
            <Container className='wrap'>
                <h3>
                    Результаты
                </h3>
                <ResultsWindow/>
                <Row style={{height:'5vh'}}></Row>
            </Container>
        </div>
    );
};

export default Results;