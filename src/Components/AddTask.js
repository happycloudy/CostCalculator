import {Col,Row, Button} from 'react-bootstrap';

export default function AddTask(){
    return(
    <div className="AddTaskWrap">
    <form className="AddTask" action="/addworkertask" method="POST">
      <h2>
        Добавить задание
      </h2>
      <Row>
        <Col>
            <h3>Сотрудник</h3>
            <input className="WorkerField" name="name"/>
        </Col>

        <Col>
            <h3>Задание</h3>
            <input className="Task" name="task"/>
        </Col>
        <Col>
            <h3>Время на задачу </h3>
            <input className="TimeForTask" name="time"/>
        </Col>
      </Row>
      <Button variant="primary" type="submit" style={{marginTop: "30px"}} >
        Добавить задание
      </Button>
    </form>
  </div>)
}