import {React} from 'react'
import {Navbar,Nav} from 'react-bootstrap'

export default function Navigation(){
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Cost Calculator</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Главная</Nav.Link>
                    <Nav.Link href="/workers">Сотрудники</Nav.Link>
                    <Nav.Link href="/timeline">Таймлайн</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}