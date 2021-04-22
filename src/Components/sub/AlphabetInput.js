import React, {useRef, useState} from 'react';
import isAlpha from 'validator/lib/isAlpha';
import {Overlay, Tooltip} from "react-bootstrap";

export default AlphabetInput;

function AlphabetInput(props) {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const handleChange = (e)=>{
        if (isAlpha(e.target.value.replace(' ', ''), 'ru-RU')) {
            setShow(false)
            props.setIsRightField(true)
        } else {
            if(e.target.value !== '') setShow(true)
        }
    }
    return (
        <>
            {// будет неюзабелен
                props.value !== undefined?
                    props.isRequest?
                        <input ref={target}
                               className={props.className}
                               name={props.name}
                               value={props.value}
                               required
                               onChange={(e)=> {
                                   handleChange(e)
                                   props.ParseForm(e)
                               }
                               }>
                        </input>
                        :
                        <input ref={target}
                               className={props.className}
                               name={props.name}
                               value={props.value}
                               onChange={(e)=> {
                                   handleChange(e)
                                   props.ParseForm(e)
                               }
                               }>
                        </input>
                    :
                    <input ref={target}
                           className={props.className}
                           name={props.name}
                           required
                           onChange={(e)=> {
                               handleChange(e)
                               props.parseForm(e)
                           }}
                    />
            }
            <Overlay target={target.current} show={show} placement="left">
                    <Tooltip id="overlay-example">
                        Ошибка ввода! <br/> Вводите только русские буквы!
                    </Tooltip>
            </Overlay>
        </>
);
}
