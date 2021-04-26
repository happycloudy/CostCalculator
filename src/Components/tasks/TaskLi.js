import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import ModalTask from "./ModalTask";

const TaskLi = (props) => {
    const [isShow, setIsShow] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const HandleEnterMouse = () => setIsActive(true)
    const HandleLeaveMouse = () => setIsActive(false)
    return (
        <>
            <ModalTask
                show={isShow}
                task={props.task}
                reload={props.reload}
                onHide={() => setIsShow(false)}
                setIsShow={setIsShow}
            />
            {
                isActive ?
                    <Button variant="primary"
                            className='mt-1'
                            onMouseEnter={HandleEnterMouse}
                            onMouseLeave={HandleLeaveMouse}
                            onClick={() => setIsShow(true)}
                    >
                        {props.task.task}, Выполняет: {props.task.name !== undefined? props.task.name: 'Свободно'}
                    </Button>
                    :
                    <Button variant="secondary"
                            onMouseEnter={HandleEnterMouse}
                            onMouseLeave={HandleLeaveMouse}
                            className='mt-1'
                            onClick={() => setIsShow(true)}
                    >
                        {props.task.task}, Выполняет: {props.task.name !== undefined? props.task.name: 'Свободно'}
                    </Button>
            }
        </>
    );
}

export default TaskLi;