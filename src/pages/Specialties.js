import React from 'react';
import {Container} from "react-bootstrap";
import SpecialtiesList from "../Components/Specialties/SpecialtiesList";
import BackBtn from "./BackBtn";

const Specialties = () => {
    return (
        <div className='App'>
            <Container>
                <BackBtn/>
                <SpecialtiesList/>
            </Container>
        </div>
    );
};

export default Specialties;