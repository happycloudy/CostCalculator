import {Col,Row, Button} from 'react-bootstrap';
import {React,useState} from 'react';
import NotNumberToolTipField from "./NotNumberToolTipField";

export default function AddWorker(){
  const [isSubmitted,setIsSubmitted] = useState(false)
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
            <NotNumberToolTipField name="WorkerCost" setIsSubmitted={(isSubmitted)=>{setIsSubmitted(isSubmitted)}}/>
          </Col>
        </Row>
        {isSubmitted?
            <Button variant="primary" type="submit" style={{marginTop: "30px"}} >
              Добавить
            </Button>
        :
        null}
      </form>
    </div>
  )
}