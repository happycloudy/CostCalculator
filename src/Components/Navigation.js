import {React} from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Navigation(){
    return(
        <Navbar bg="dark" variant='dark' expand="lg">
            <Navbar.Brand href="#home">Cost Calculator</Navbar.Brand>
                <Nav className="mr-auto">
                    <>
                        <Link className='nav-link' to='/'>
                            Главная
                        </Link>
                    </>
                    <>
                        <Link className='nav-link' to='/workers'>
                            Сотрудники
                        </Link>
                    </>
                    <>
                        <Link className='nav-link' to='/timeline'>
                            Таймлайн
                        </Link>
                    </>
                    <>
                        <Link className='nav-link' to='/taskspage'>
                            Задания
                        </Link>
                    </>
                    <>
                        <Link className='nav-link' to='/specialties'>
                            Специальности
                        </Link>
                    </>
                </Nav>
        </Navbar>
    )
}