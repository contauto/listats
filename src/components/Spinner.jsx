import React from 'react';

function Spinner() {
    return (
        <div
            className="spinner-border position-absolute top-50 start-50"
            role="status"
        >
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

export default Spinner;