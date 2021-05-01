import React from 'react';
import {Link} from "react-router-dom";

const BackBtn = () => {
    return (
        <Link to='/'>
            <div className='backbtn'>
                <img src='./left-arrow.png' style={{height: '50px', width: '50px'}}/>
            </div>
        </Link>
    );
};

export default BackBtn;