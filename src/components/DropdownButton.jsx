import React from 'react';

const DropdownButton=React.forwardRef((props,ref)=>{
    const {onClick,pendingApiCall,name}=props
    return (
        <button
            id="dropdown"
            className="btn btn-secondary dropdown-toggle"
            disabled={pendingApiCall}
            onClick={onClick}
            ref={ref}
        >
            {name}
        </button>
    );
}
)
export default DropdownButton;