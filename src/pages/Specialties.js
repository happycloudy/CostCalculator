import React from 'react';
import {Container} from "react-bootstrap";
import SpecialtiesList from "../Components/Specialties/SpecialtiesList";

const Specialties = () => {
    return (
        <div className='App'>
            <Container>
                <SpecialtiesList/>
            </Container>
        </div>
    );
};

export default Specialties;