import React from 'react';

function Title(props) {
    return (
        <div className="text-center">
            <h3>{props.text}</h3>
        </div>
    );
}

export default Title;