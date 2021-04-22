import {Button, Modal} from "react-bootstrap";
import axios from "axios";

export default function ModalTask(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Задание работника : {props.task.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.task.task}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={() => {
                    axios.post('/removetask', props.task).then(_ => {
                        props.reload()
                        props.onHide()
                    })
                }}>Удалить задание</Button>
                <Button onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
}