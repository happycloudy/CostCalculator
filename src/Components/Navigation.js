import {React} from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Navigation(){
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Cost Calculator</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link to='/'>
                            Главная
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to='/workers'>
                            Сотрудники
                        </Link>
                    </Nav.Link>
                    <Nav.Link >
                        <Link to='/timeline'>
                            Таймлайн
                        </Link>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}