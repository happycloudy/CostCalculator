import {Col,Row, Button} from 'react-bootstrap';
import React from 'react';

export default function AddWorker(){
  return(
      <div className="AddWorkerWrap">
      <h2>Добавить сотрудника</h2>
      <form className="AddWorker" action="/addworker" method="POST">
        <Row>
          <Col>
            <h3>
              Сотрудник
            </h3>
            <input className="WorkerField" name="WorkerName" required/>
          </Col>
          <Col>
            <h3>
              ЗП $ / час
            </h3>
            <input className="WorkerCostField" name="WorkerCost" required/>
          </Col>
        </Row>
        <Button variant="primary" type="submit" style={{marginTop: "30px"}} >
          Добавить
        </Button>
      </form>
    </div>
  )
}