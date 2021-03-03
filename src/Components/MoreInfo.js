import {Button,Modal,ListGroup} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import RemoveTaskBtn from './RemoveTaskBtn'

export default function MoreInfo(props){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    // console.log(props);
    // await props.getTasks()
    setShow(true)
  }
      
  return (
    <>
      {props.worker.tasks.length !=  0?
      <Button variant="primary" onClick={handleShow}>
        Подробнее...
      </Button>:
      <Button variant="primary" onClick={handleShow} disabled>
      Нету заданий
      </Button>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.worker.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {props.worker.tasks.map((task)=>{
              return(
                <ListGroup.Item key={task.task}>
                  {task.task}
                <RemoveTaskBtn task={task}/>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}   