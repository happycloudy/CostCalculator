import React from 'react';
import '../styles/cards.css'
import {Link} from "react-router-dom";

const LinkCard = (props) => {
    return (
        <Link className='indexCard' to={props.link} style={{color: 'white', fontSize: '2rem', textDecoration: 'none'}}>
            <div >
                {props.text}
            </div>
        </Link>
    );
};

export default LinkCard;