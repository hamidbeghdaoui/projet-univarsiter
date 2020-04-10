import React, { Fragment, Component } from 'react';
import axios from "axios";
import TypeFilePosible from "./../helpers/typeFilePosible";
import Alert from "./../helpers/alert";



class Publication extends Component {

    // ----------------------------------------- data----------------------------------------
    state = {
        error: null,
        alert: {
            color: 'warning',
            title: 'REMARQUE',
            subject: 'Ce type de fichier ne peut pas être envoyé',
        },
        btnPubEnreg: ""
    }

    //---------------------------------------------contact server----------------------------------------
    InsertPubEnreg = (idPub) => {
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        let API_PATH = "";
        switch (sessionUser.typeUser) {
            case "etudiant":
                API_PATH = "http://127.0.0.1/project/backend/ajax/etudiant.php";
                break;
            case "prof":
                API_PATH = "http://127.0.0.1/project/backend/ajax/prof.php";
                break;
        }
        console.log(sessionUser);
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'insert-pub-Enregistrees',
                id_typeUser: sessionUser.id_typeUser,
                idPub: idPub
            }
        })
            .then(result => {
                console.log(result.data);
                if (result.data) {
                    this.setState({
                        btnPubEnreg: idPub
                    });
                }
            })
            .catch(error => this.setState({ error: error.message }));

    }

    DeletedPubEnreg = (idPub) => {
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        let API_PATH = "";
        switch (sessionUser.typeUser) {
          case "etudiant":
            API_PATH ="http://127.0.0.1/project/backend/ajax/etudiant.php";
            break;
          case "prof":
            API_PATH ="http://127.0.0.1/project/backend/ajax/prof.php";
            break;
        }
        console.log(sessionUser);
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'deleted-pub-Enregistrees',
                id_typeUser: sessionUser.id_typeUser,
                idPub: idPub
            }
        })
            .then(result => {
                console.log(result.data);
                if (result.data) {
                    this.props.getPub();

                }
            })
            .catch(error => this.setState({ error: error.message }));

    }
    //--------------------------------------------- Render ----------------------------------------
    render() {
        const { pubEnreg, listPub } = this.props;
        const Resalt = listPub.map(item => {
            if (item.typeAugmenter === null) {
                return (
                    <div className={"card mb-3 " + (item.typeUser === 'etudiant' ? " border-secondary" :
                        item.typeUser === 'prof' ? "border-info" : "border-danger")}
                        key={item.id_pub}>
                        <div className="card-header">
                            <div className="float-left">
                                {item.image === null ?
                                    <span className="imageUserPub mx-1 float-left ">
                                        {item.prenom.charAt(0).toUpperCase()}
                                    </span>
                                    : <img className="rounded-circle mx-1" src={"http://127.0.0.1/project/backend/file/user/" + item.image} width="40" height="40" />}
                                <span className="btn p-0 mt-1">{item.nom + " " + item.prenom}</span>
                            </div>
                            <div className="float-right mt-1"> {item.typeUser} </div>
                        </div>
                        <div className="card-body text-secondary">
                            <p className="card-text">{item.pub}</p>
                            <div className="text-center">
                                {pubEnreg ?
                                    <Fragment>
                                        <a className="btn btn-danger mt-1 mx-1 text-light size-1"
                                            onClick={() => this.DeletedPubEnreg(item.id_pub)} >
                                            Supprimer
                                        </a>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        {this.props.hedenBtnEnr ? '' :
                                            <Fragment>
                                                {item.id_pub === this.state.btnPubEnreg ?
                                                    <a className="btn btn-success mt-1 mx-1 text-light  size-1">
                                                        <i className="fas fa-bookmark fa-sm text-white-50 mr-2"></i>
                                                 Enregistrer
                                           </a>
                                                    :
                                                    <a className="btn btn-dark mt-1 mx-1 text-light  size-1"
                                                        onClick={() => this.InsertPubEnreg(item.id_pub)}>
                                                        <i className="fas fa-bookmark fa-sm text-white-50 mr-2"></i>
                                                Enregistrer
                                            </a>
                                                }
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                            </div>
                        </div>
                        <div className="card-footer bg-transparent">
                            <div className="float-left">{item.date.split(" ")[0]}</div>
                            <div className="float-right text-muted">
                                {item.date.split(" ")[1].split(":")[0] + ":" + item.date.split(" ")[1].split(":")[1]}
                            </div>
                        </div>
                    </div>
                );
            }
            if (TypeFilePosible(item.typeAugmenter, 'image')) {
                return (
                    <div className={"card mb-3 " + (item.typeUser === 'etudiant' ? " border-secondary" :
                        item.typeUser === 'prof' ? "border-info" : "border-danger")}
                        key={item.id_pub}>
                        <div className="card-header">
                            <div className="float-left">
                                {item.image === null ?
                                    <span className="imageUserPub mx-1 float-left ">
                                        {item.prenom.charAt(0).toUpperCase()}
                                    </span>
                                    : <img className="rounded-circle mx-1" src={"http://127.0.0.1/project/backend/file/user/" + item.image} width="40" height="40" />}
                                <span className="btn p-0 mt-1">{item.nom + " " + item.prenom}</span>
                            </div>
                            <div className="float-right mt-1"> {item.typeUser} </div>
                        </div>
                        <div className="card-body text-secondary">
                            <p className="card-text">{item.pub}</p>
                            <div className="text-center">
                                <img src={"http://127.0.0.1/project/backend/file/file publication/" + item.augmenter} width="650" className="img-fluid" alt="Responsive image" />

                            </div>
                            <div className="text-center">
                                <a className="btn btn-dark mt-1 mx-1 text-light size-1" href={"http://127.0.0.1/project/backend/file/file publication/" + item.augmenter} download>
                                    <i className="fas fa-download fa-sm text-white-50 mr-2"></i>
                                      Téléchargez
                                </a>

                                {pubEnreg ?
                                    <Fragment>
                                        <a className="btn btn-danger mt-1 mx-1 text-light size-1"
                                            onClick={() => this.DeletedPubEnreg(item.id_pub)} >
                                            Supprimer
                                        </a>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        {this.props.hedenBtnEnr ? '' :
                                            <Fragment>
                                                {item.id_pub === this.state.btnPubEnreg ?
                                                    <a className="btn btn-success mt-1 mx-1 text-light  size-1">
                                                        <i className="fas fa-bookmark fa-sm text-white-50 mr-2"></i>
                                             Enregistrer
                                       </a>
                                                    :
                                                    <a className="btn btn-dark mt-1 mx-1 text-light  size-1"
                                                        onClick={() => this.InsertPubEnreg(item.id_pub)}>
                                                        <i className="fas fa-bookmark fa-sm text-white-50 mr-2"></i>
                                            Enregistrer
                                        </a>
                                                }
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                            </div>
                        </div>
                        <div className="card-footer bg-transparent">
                            <div className="float-left">{item.date.split(" ")[0]}</div>
                            <div className="float-right text-muted">
                                {item.date.split(" ")[1].split(":")[0] + ":" + item.date.split(" ")[1].split(":")[1]}
                            </div>
                        </div>
                    </div>
                );
            } else if (TypeFilePosible(item.typeAugmenter, 'file')) {
                return (
                    <div className={"card mb-3 " + (item.typeUser === 'etudiant' ? " border-secondary" :
                        item.typeUser === 'prof' ? "border-info" : "border-danger")}
                        key={item.id_pub}>
                        <div className="card-header">
                            <div className="float-left">
                                {item.image === null ?
                                    <span className="imageUserPub mx-1 float-left ">
                                        {item.prenom.charAt(0).toUpperCase()}
                                    </span>
                                    : <img className="rounded-circle mx-1" src={"http://127.0.0.1/project/backend/file/user/" + item.image} width="40" height="40" />}
                                <span className="btn p-0 mt-1">{item.nom + " " + item.prenom}</span>
                            </div>
                            <div className="float-right mt-1"> {item.typeUser} </div>
                        </div>
                        <div className="card-body text-secondary">
                            <p className="card-text">{item.pub}</p>
                            <div className="text-center">
                                <h1 className="h3">
                                    {item.augmenter}
                                </h1>
                            </div>
                            <div className="text-center">
                                <a className="btn btn-dark mt-1 mx-1 text-light size-1" href={"http://127.0.0.1/project/backend/file/file publication/" + item.augmenter} download>
                                    <i className="fas fa-download fa-sm text-white-50 mr-2"></i>
                                  Téléchargez
                            </a>

                                {pubEnreg ?
                                    <Fragment>
                                        <a className="btn btn-danger mt-1 mx-1 text-light size-1"
                                            onClick={() => this.DeletedPubEnreg(item.id_pub)} >
                                            Supprimer
                                        </a>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        {this.props.hedenBtnEnr ? '' :
                                            <Fragment>
                                                {item.id_pub === this.state.btnPubEnreg ?
                                                    <a className="btn btn-success mt-1 mx-1 text-light  size-1">
                                                        <i className="fas fa-bookmark fa-sm text-white-50 mr-2"></i>
                                             Enregistrer
                                       </a>
                                                    :
                                                    <a className="btn btn-dark mt-1 mx-1 text-light  size-1"
                                                        onClick={() => this.InsertPubEnreg(item.id_pub)}>
                                                        <i className="fas fa-bookmark fa-sm text-white-50 mr-2"></i>
                                            Enregistrer
                                        </a>
                                                }
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                            </div>
                        </div>
                        <div className="card-footer bg-transparent">
                            <div className="float-left">{item.date.split(" ")[0]}</div>
                            <div className="float-right text-muted">
                                {item.date.split(" ")[1].split(":")[0] + ":" + item.date.split(" ")[1].split(":")[1]}
                            </div>
                        </div>
                    </div>
                );
            }
            if (item.typeAugmenter === 'line') {
                return (
                    <div className={"card mb-3 " + (item.typeUser === 'etudiant' ? " border-secondary" :
                        item.typeUser === 'prof' ? "border-info" : "border-danger")}
                        key={item.id_pub}>
                        <div className="card-header">
                            <div className="float-left">
                                {item.image === null ?
                                    <span className="imageUserPub mx-1 float-left ">
                                        {item.prenom.charAt(0).toUpperCase()}
                                    </span>
                                    : <img className="rounded-circle mx-1" src={"http://127.0.0.1/project/backend/file/user/" + item.image} width="40" height="40" />}
                                <span className="btn p-0 mt-1">{item.nom + " " + item.prenom}</span>
                            </div>
                            <div className="float-right mt-1"> {item.typeUser} </div>
                        </div>
                        <div className="card-body text-secondary">
                            <p className="card-text">{item.pub}</p>
                            <div className="text-center">
                                <h1 className="h3">
                                    <a href={item.augmenter} target="_blank">{item.augmenter}</a>
                                </h1>
                            </div>
                            <div className="text-center">
                                {pubEnreg ?
                                    <Fragment>
                                        <a className="btn btn-danger mt-1 mx-1 text-light size-1"
                                            onClick={() => this.DeletedPubEnreg(item.id_pub)} >
                                            Supprimer
                                        </a>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        {this.props.hedenBtnEnr ? '' :
                                            <Fragment>
                                                {item.id_pub === this.state.btnPubEnreg ?
                                                    <a className="btn btn-success mt-1 mx-1 text-light  size-1">
                                                        <i className="fas fa-bookmark fa-sm text-white-50 mr-2"></i>
                                                 Enregistrer
                                           </a>
                                                    :
                                                    <a className="btn btn-dark mt-1 mx-1 text-light  size-1"
                                                        onClick={() => this.InsertPubEnreg(item.id_pub)}>
                                                        <i className="fas fa-bookmark fa-sm text-white-50 mr-2"></i>
                                                Enregistrer
                                            </a>
                                                }
                                            </Fragment>
                                        }
                                    </Fragment>
                                }

                            </div>
                        </div>
                        <div className="card-footer bg-transparent">
                            <div className="float-left">{item.date.split(" ")[0]}</div>
                            <div className="float-right text-muted">
                                {item.date.split(" ")[1].split(":")[0] + ":" + item.date.split(" ")[1].split(":")[1]}
                            </div>
                        </div>
                    </div>
                );
            }


        });

        return (
            <Fragment>
                {Resalt}
            </Fragment >
        );

    }

}

export default Publication;