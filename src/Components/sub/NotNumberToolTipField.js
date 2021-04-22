import {Tooltip,Overlay} from 'react-bootstrap'
import {useState,useRef} from 'react'

export default function NotNumberToolTipField(props){
    const [show, setShow] = useState(false);
    const target = useRef(null);
    function isNumberCheck(e){
        let value = target.current.value
        let isNumber = !!Number(value)
        props.setIsSubmitted(isNumber)
        return !isNumber
    }
    return (
        <>
            <input className="TimeForTask" ref={target} name={props.name} value={props.value} onChange={(e)=>{
                setShow(isNumberCheck(e))
                props.ParseForm(e)
            }} required/>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Ошибка ввода!
                    </Tooltip>
                )}
            </Overlay>
        </>
    )
}