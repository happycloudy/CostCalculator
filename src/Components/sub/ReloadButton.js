import React, {useState} from 'react';
import {Button, Spinner} from "react-bootstrap";

const ReloadButton = (props) => {
    const [active, setActive] = useState(false)
    let loaderStyle = {
        position: 'absolute',
        marginLeft: '1vw'
    }
    return (
        <>
            <Button variant='secondary' onClick={async ()=>{
                setActive(true)
                await props.reload()
                setActive(false)
            }}>
                Обновить
            </Button>
            {
                active ?
                    <Spinner animation="grow" style={loaderStyle}/>
                    :
                    null
            }
        </>
    );
}

export default ReloadButton;