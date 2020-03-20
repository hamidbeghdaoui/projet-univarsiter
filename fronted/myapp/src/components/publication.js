import React, { Fragment } from 'react';


const Publication = (props) => {
    return (
        <Fragment>
            <div className="card border-secondary mb-3">
                <div className="card-header">
                    <div className="float-left btn p-0">beghdaoui hamid</div>
                    <div className="float-right"> Etudiant </div>
                </div>
                <div className="card-body text-secondary">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className="text-center">
                        <img src="https://source.unsplash.com/AU4VPcFN4LE/60x60" width="650" className="img-fluid" alt="Responsive image" />

                    </div>
                    <div className="text-center">
                        <a className="btn btn-dark mt-1 mx-1 text-light size-1">
                            <i className="fas fa-download fa-sm text-white-50 mr-2"></i>
                            Téléchargez
                       </a>

                        <a className="btn btn-dark mt-1 mx-1 text-light  size-1">
                            <i className="fas fa-bookmark fa-sm text-white-50 mr-2"></i>
                            Enregistrer
                       </a>
                    </div>
                </div>
                <div className="card-footer bg-transparent">
                    <div className="float-left">SIQ G1</div>
                    <div className="float-right text-muted"> 18-04-2020 </div>
                </div>
            </div>
            <div className="card border-primary mb-3">
                <div className="card-header">
                    <div className="float-left btn p-0">Aba abd elnour</div>
                    <div className="float-right"> Prof </div>
                </div>
                <div className="card-body text-secondary">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className="text-center">
                        <h1 className="h3">
                            cour 1 SE .pdf
                       </h1>
                    </div>
                    <div className="text-center">
                        <a className="btn btn-dark mt-1 text-light mx-auto size-1">
                            <i className="fas fa-download fa-sm text-white-50 mr-1"></i>
                            Téléchargez
                       </a>
                    </div>
                </div>
                <div className="card-footer bg-transparent">
                    <div className="float-left">SE 2</div>
                    <div className="float-right text-muted"> 18-04-2020 </div>
                </div>
            </div>

            <div className="card border-danger  mb-3">
                <div className="card-header">
                    <div className="float-left btn p-0">beghdaoui hamid</div>
                    <div className="float-right"> Admin </div>
                </div>
                <div className="card-body text-secondary">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk
                     of the card's content.</p>
                    <div className="text-center">
                        <h1 className="h3">
                            cour 1 SE .pdf
                       </h1>
                    </div>
                    <div className="text-center">
                        <a className="btn btn-dark mt-1 text-light mx-auto size-1">
                            <i className="fas fa-download fa-sm text-white-50 mr-1"></i>
                            Téléchargez
                       </a>
                    </div>
                </div>
                <div className="card-footer bg-transparent">
                    <div className="float-left">Affichage</div>
                    <div className="float-right text-muted"> 18-04-2020 </div>
                </div>
            </div>
            <div className="card border-danger  mb-3">
                <div className="card-header">
                    <div className="float-left btn p-0">beghdaoui hamid</div>
                    <div className="float-right"> Admin </div>
                </div>
                <div className="card-body text-secondary">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk
                     of the card's content.</p>
                    <div className="text-center">
                        <h1 className="h3">
                            <a href="https://www.google.com/search?q=google+drive&oq=go&aqs=chrome.1.69i57j35i39l2j0l4j69i60.5499j0j7&sourceid=chrome&ie=UTF-8" target="_blank">google drave</a>
                        </h1>
                    </div>
                    <div className="text-center">
                        <a className="btn btn-dark mt-1 mx-1 text-light  size-1">
                            <i className="fas fa-bookmark fa-sm text-white-50 mr-2"></i>
                            Enregistrer
                       </a>
                    </div>

                </div>
                <div className="card-footer bg-transparent">
                    <div className="float-left">Affichage</div>
                    <div className="float-right text-muted"> 18-04-2020 </div>
                </div>
            </div>
        </Fragment>
    );

}

export default Publication;