import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import SortButton from "./SortButton";
import AddTaskSpecModal from "./AddTaskSpecModal";
import {useState} from "react";

export default function ModalTask(props) {
    const [show, setShow] = useState(false)
    const handleShow = () => {
        props.reload()
        setShow(true)
        props.setIsShow(false)
    }
    const handleClose = () => {
        props.reload()
        setShow(false)
        props.setIsShow(true)
    }

    return (
        <>
            <AddTaskSpecModal show={show}
                              handleClose={handleClose}
                              reload={props.reload}
                              task={props.task}
            />
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Задание работника : {props.task.name !== 'undefined'? props.task.name: 'Свободно'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.task.task}
                </Modal.Body>
                <Modal.Footer>
                    {
                        props.task.name === 'Свободно'?
                            <>
                                <SortButton reload={props.reload} task={props.task} hide={props.onHide}/>
                                <Button variant="success" onClick={handleShow}>
                                    Распределить по специальности
                                </Button>
                            </>
                            :
                            null
                    }
                    <Button variant='danger' onClick={() => {
                        axios.post('/removetask', props.task).then(_ => {
                            props.reload()
                            props.onHide()
                        })
                    }}>Удалить задание</Button>

                    <Button onClick={props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}