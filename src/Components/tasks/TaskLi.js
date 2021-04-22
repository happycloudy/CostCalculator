import React, {useState} from 'react';
import {ListGroup} from "react-bootstrap";
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
            />
            {
                isActive?
                    <ListGroup.Item variant="secondary"
                                    onMouseEnter={HandleEnterMouse}
                                    onMouseLeave={HandleLeaveMouse}
                                    active
                                    onClick={()=> setIsShow(true)}
                    >
                        {props.task.task}, Выполняет: {props.task.worker}
                    </ListGroup.Item>
                    :
                    <ListGroup.Item variant="secondary" onMouseEnter={HandleEnterMouse} onMouseLeave={HandleLeaveMouse}>
                        {props.task.task}, Выполняет: {props.task.worker}
                    </ListGroup.Item>
            }
        </>
    );
};

export default TaskLi;