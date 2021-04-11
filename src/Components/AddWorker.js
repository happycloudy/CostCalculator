import {Col,Row, Button} from 'react-bootstrap';
import {useState} from 'react';
import NotNumberToolTipField from "./NotNumberToolTipField";
import AlphabetInput from "./AlphabetInput";

export default function AddWorker(){
  const [isRightPaymentField,setIsRightPaymentField] = useState(false)
  const [isRightWorkerField, setIsRightWorkerField] = useState(false)
  const [value,setValue] = useState('')

  return(
      <div className="AddWorkerWrap">
      <h2>Добавить сотрудника</h2>
      <form className="AddWorker"
            action="/addworker"
            method="POST">
        <Row>
          <Col>
            <h3>
              Сотрудник
            </h3>
            <AlphabetInput setIsRightField={setIsRightWorkerField} className="WorkerField" name="WorkerName" />
          </Col>
          <Col>
            <h3>
              ЗП $/ час
            </h3>
            <NotNumberToolTipField name="WorkerCost" value={value} setIsSubmitted={(isRightPaymentField)=>{
              setIsRightPaymentField(isRightPaymentField)
            }} ParseForm={(e)=>{
              setValue(e.target.value)
            }}/>
          </Col>
          <Col>
            <h3>
              Специальность
            </h3>
            <AlphabetInput setIsRightField={setIsRightWorkerField} className="WorkerField" name="WorkerSpecialty" />
          </Col>
        </Row>
        {isRightPaymentField && isRightWorkerField?
            <Button variant="primary" type="submit" style={{marginTop: "30px"}} >
              Добавить
            </Button>
        :
        null}
      </form>
    </div>
  )
}