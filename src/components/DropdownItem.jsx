import React from 'react';
import {useDispatch} from "react-redux";
import {dataHandler, lastHandler} from "../redux/Actions";

function DropdownItem(props) {
    const dispatch = useDispatch()
    const data = (url, text) => {
        dispatch(dataHandler(url, text));
    };

    const last = (text) => {
        dispatch(lastHandler(text));
    };


    return (
        <h6
            style={{cursor: "pointer"}}
            onClick={() => {
                if (props.type === "top") {
                    data(props.url, props.title);
                } else if (props.type === "last") {
                    last(props.title)
                }
            }}
            className="dropdown-item"
        >
            {props.name}
        </h6>
    );
}

export default DropdownItem;