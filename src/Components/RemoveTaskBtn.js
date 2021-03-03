import {Button,Modal,ListGroup} from 'react-bootstrap'


export default function RemoveTaskBtn(props){
    
    return(
        <Button onClick={()=> RemoveTask(props.task)} className="btn" size="sm" style={{float:'right'}}>
            удалить
        </Button>
    )
}

function RemoveTask(task){
    console.log(task);// дописать на серве и здесь
}