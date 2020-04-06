import React, { Fragment } from 'react';


const Alert = (props) => {
    const { alert ,funHidenAlert } = props;
    return (
        <Fragment>
            <div className={"alert  alert-dismissible fade show mx-5 my-1 alert-" + alert.color} role="alert">
                <strong>{alert.title}!</strong> {alert.subject}.
                <button type="button" className="close" onClick={()=>funHidenAlert()}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

        </Fragment>
    );

}

export default Alert;