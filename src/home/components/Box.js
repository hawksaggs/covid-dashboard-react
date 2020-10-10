import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';


import './Box.css';

const Box = (props) => {
    return (
        <div className={`box ${props.class}`}>
            <strong className="row box-text">{props.type} <span></span></strong>
            <strong className="row box-text">{props.count}
            {props.today ?
                <span className={`${(props.today > 0 && props.type !== 'Recovered') ? 'up' : 'down'}`}>({props.today}{props.today > 0 ? <FontAwesomeIcon icon={faArrowUp}/> : <FontAwesomeIcon icon={faArrowDown}/>})</span>
                : null}
            </strong>
        </div>
    )
};

export default Box;