import {Button, Modal, ListGroup, Col, Row} from 'react-bootstrap'
import {useState} from 'react'
import RemoveTaskBtn from './RemoveTaskBtn'
import moment from "moment";
import axios from "axios";
import ModalSpecialties from "./ModalSpecialties";

export default function MoreInfo(props) {
    const [task, setTask] = useState('')
    const [showSpec,setShowSpec] = useState(false)
    const [days, setDays] = useState(0)
    const [show, setShow] = useState(false);
    const [isOWRequest, setIsOWRequest] = useState(false)
    const handleClose = () => {
        props.ReloadInfo()
        setShow(false)
    }

    const handleShow = () => {
        props.ReloadInfo()
        setShow(true)
    }

    const sendTask = async () => {
        let StartDate = new Date()
        let EndDate = await moment(new Date()).add(days, 'days')
        await axios.post("/addworkertask", {
            name: props.worker.name,
            task: task,
            time: days,
            isSpecialtyRequest: false,
            isOverWorkRequest: isOWRequest,
            StartTime: `${StartDate.getFullYear()}-${StartDate.getMonth()}-${StartDate.getDate()}`,
            EndTime: `${EndDate.year()}-${EndDate.month()}-${EndDate.date()}`,
            isChooseBtwSp: undefined
        }).then(res => {
            props.ReloadInfo()
        })
    }
    return (
        <>
            {props.worker.tasks.length !== 0 ?
                <Button variant="primary" onClick={handleShow}>
                    Подробнее...
                </Button> :
                <Button variant="primary" onClick={handleShow} disabled>
                    Нету заданий
                </Button>
            }
            <ModalSpecialties showSpec={showSpec} setShow={setShow} worker={props.worker} setShowSpec={setShowSpec}/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Row>
                        <Col>

                            <Modal.Title>
                                {props.worker.name}, {props.worker.specialty}
                            </Modal.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={()=> {
                                setShowSpec(true)
                                setShow(false)
                            }}>
                                Добавить специализацию
                            </Button>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <ListGroup>
                        {props.worker.tasks.map((task) => {
                            let EndDate = moment(task.EndTime, 'YYYY-MM-DD')
                            EndDate = `${EndDate.date()}.${EndDate.month()}.${EndDate.year()}`
                            return (
                                <ListGroup.Item key={task.name + task.task + task.StartTime}>
                                    {task.task}
                                    <br/>До {EndDate}
                                    <RemoveTaskBtn task={task}/>
                                </ListGroup.Item>
                            )
                        })}
                        <ListGroup.Item className='mt-4'>
                            <h5>
                               Добавить задание
                            </h5>
                            <p>
                                Задание:
                            </p>
                            <input onChange={(e) => setTask(e.target.value)} type='text'/>
                            <p className='mt-2'>
                                Дней на задачу:
                            </p>
                            <input type='text' onChange={(e) => setDays(parseInt(e.target.value))}/>
                            <p className='mt-2'>
                                Добавить переработку?
                            </p>
                            <input type='checkbox' onClick={()=> setIsOWRequest(!isOWRequest)}/>
                            <br/>
                            <Button className='mt-3' onClick={sendTask}>
                                Добавить
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}   