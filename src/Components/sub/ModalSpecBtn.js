import React, {useState} from 'react';
import {Button} from "react-bootstrap";

const ModalSpecBtn = (props) => {
    const [active, setActive] = useState(true)
    return (
        <>
            {
                active?
                    <Button className='mt-3'
                            onClick={async () => {
                                setActive(false)
                                await props.setSpec()
                                await props.addSpecialty()
                                await props.reloadInfo()
                            }}
                    >
                        {props.spec}
                    </Button>: null
            }
        </>
    );
};

export default ModalSpecBtn;