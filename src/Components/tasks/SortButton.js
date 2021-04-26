import React from 'react';
import {Button} from "react-bootstrap";
import axios from "axios";

const SortButton = (props) => {
    return (
        <Button variant='info' onClick={() => Sort(props.reload, props.task)}>
            Распеределить без учета специальности
        </Button>
    );
};

const Sort = (reload, task) => {
    axios.post("/sorttaskwthoutspec", {
        name: task.name,
        task: task.task,
        time: task.time,
        StartTime: task.StartTime,
        EndTime: task.EndTime
    }).then(_ => {
        // hide()
        reload()
        console.log('добавлено')
    })
}

export default SortButton;