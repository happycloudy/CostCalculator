import {Button, Modal, ListGroup, Col, Row} from 'react-bootstrap'
import {useState} from 'react'
import RemoveTaskBtn from './RemoveTaskBtn'
import moment from "moment";
import axios from "axios";
import ModalSpecialties from "./ModalSpecialties";
import ChooseTaskModal from "../workers/ChooseTaskModal";

export default function MoreInfo(props) {
    const [task, setTask] = useState('')
    const [showSpec, setShowSpec] = useState(false)
    const [showTasks, setShowTasks] = useState(false)
    const [show, setShow] = useState(false);
    const [days, setDays] = useState(0)
    const [isOWRequest, setIsOWRequest] = useState(false)

    const handleClose = () => {
        props.ReloadInfo()
        setShow(false)
    }

    const handleShow = () => {
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
            <Button variant="primary" onClick={handleShow}>
                Подробнее...
            </Button>
            <ModalSpecialties reloadInfo={props.ReloadInfo}
                              showSpec={showSpec}
                              setShow={setShow}
                              worker={props.worker}
                              setShowSpec={setShowSpec}
            />
            <ChooseTaskModal showTasks={showTasks}
                             worker={props.worker}
                             reloadInfo={props.ReloadInfo}
                             setShow={setShow}
                             setShowTasks={setShowTasks}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <>
                    <Row>
                        <Col>
                            <div>
                                <h4>{props.worker.name},</h4>
                                <br/>
                                {props.worker.specialty}
                            </div>
                        </Col>
                        <Col>
                            <Button onClick={() => {
                                setShowSpec(true)
                                setShow(false)
                            }}>
                                Добавить специализацию
                            </Button>
                        </Col>
                    </Row>
                    </>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <Button onClick={() => {
                        setShowTasks(true)
                        setShow(false)
                    }}>
                        Добавить задание
                    </Button>
                    <ListGroup className='mt-4'>
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
                            <input type='checkbox' onClick={() => setIsOWRequest(!isOWRequest)}/>
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