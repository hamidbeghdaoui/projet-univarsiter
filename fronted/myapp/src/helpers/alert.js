import React, { Fragment } from 'react';


const Alert = (props) => {
    return (
        <Fragment>
            <div className="alert alert-warning alert-dismissible fade show m-5" role="alert">
                <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

        </Fragment>
    );

}

export default Alert;