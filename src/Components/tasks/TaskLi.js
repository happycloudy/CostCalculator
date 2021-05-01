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
                setIsShow={setIsShow}
            />
            {
                isActive ?
                    <ListGroup.Item variant="warning"
                                    className='mt-3'
                                    onMouseEnter={HandleEnterMouse}
                                    onMouseLeave={HandleLeaveMouse}
                                    onClick={() => setIsShow(true)}
                    >
                        <h5>{props.task.task},</h5>
                        Выполняет:
                        {
                            props.task.name === 'Свободно' ?
                                <h5 className='text-primary'>{props.task.name}</h5>
                                :
                                <h5>{props.task.name}</h5>
                        }
                    </ListGroup.Item>
                    :
                    <ListGroup.Item variant="secondary"
                                    onMouseEnter={HandleEnterMouse}
                                    onMouseLeave={HandleLeaveMouse}
                                    className='mt-3'
                                    onClick={() => setIsShow(true)}
                    >
                        <h5>{props.task.task},</h5>
                        Выполняет:
                        {
                            props.task.name === 'Свободно' ?
                                <h5 className='text-primary'>{props.task.name}</h5>
                                :
                                <h5>{props.task.name}</h5>
                        }
                    </ListGroup.Item>
            }
        </>
    );
}

export default TaskLi;