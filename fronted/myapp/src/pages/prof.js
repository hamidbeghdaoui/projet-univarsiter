import React, { Fragment } from 'react';


const Prof = (props) => {
    return (
        <Fragment>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Rechercher un prof"
                    aria-label="Rechercher un enseignant" aria-describedby="button-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Rechercher</button>
                </div>
            </div>
            <h2 className="text-muted text-center my-5">Mon Prof</h2>
            <div className="card text-white bg-info mb-3">
                <div className="card-header">
                    <div className="w-100 py-3 px-2">
                        <div className="small  w-100">
                            <div className="float-left">
                                <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" width="60"
                                    height="60" />
                                <span className="ml-2">Morgan Alvarez</span>
                            </div>
                            <div className="float-right mt-3 mr-2">Prof SE</div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <a className="btn btn-dark mt-1 mx-1 text-light size-1">
                            Envoyer un message
                       </a>

                        <a className="btn btn-dark mt-1 mx-1 text-light  size-1">
                            Les publications
                       </a>
                    </div>
                </div>
            </div>
            <div className="card text-white bg-info mb-3">
                <div className="card-header">
                    <div className="w-100 py-3 px-2">
                        <div className="small  w-100">
                            <div className="float-left">
                                <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" width="60"
                                    height="60" />
                                <span className="ml-2">Morgan Alvarez</span>
                            </div>
                            <div className="float-right mt-3 mr-2">Prof SE</div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <a className="btn btn-dark mt-1 mx-1 text-light size-1">
                            Envoyer un message
                       </a>

                        <a className="btn btn-dark mt-1 mx-1 text-light  size-1">
                            Les publications
                       </a>
                    </div>
                </div>
            </div>
            <div className="card text-white bg-info mb-3">
                <div className="card-header">
                    <div className="w-100 py-3 px-2">
                        <div className="small  w-100">
                            <div className="float-left">
                                <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" width="60"
                                    height="60" />
                                <span className="ml-2">Morgan Alvarez</span>
                            </div>
                            <div className="float-right mt-3 mr-2">Prof SE</div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <a className="btn btn-dark mt-1 mx-1 text-light size-1">
                            Envoyer un message
                       </a>

                        <a className="btn btn-dark mt-1 mx-1 text-light  size-1">
                            Les publications
                       </a>
                    </div>
                </div>
            </div>

        </Fragment>
    );

}

export default Prof;