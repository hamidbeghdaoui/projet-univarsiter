import React, { Fragment } from 'react';


const Spinner = (props) => {

    return (
        <Fragment>

            <div className="text-center">
                <div className="spinner-border my-5 text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </Fragment>
    );

}

export default Spinner;
