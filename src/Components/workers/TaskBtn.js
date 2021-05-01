import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import axios from "axios";

const TaskBtn = (props) => {
    const [active, setActive] = useState(true)
    return (
        <>
            {
                active?
                    <Button onClick={async () => {
                        setActive(false)
                        chooseTask(props)
                        await props.reloadInfo()
                    }}
                            className='mt-3'
                    >
                        {props.task.task}
                    </Button>
                    : null
            }
        </>
    );
};

const chooseTask = (props) => {
    axios.post('/choosetaskworker', {
        task: props.task,
        workerName: props.worker.name
    }).then(res => console.log(res.status))
}

export default TaskBtn;