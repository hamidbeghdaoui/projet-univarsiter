import React, { Fragment, Component } from 'react';
import Spinner from "./../helpers/spinner";
import Alert from "./../helpers/alert";


import axios from "axios";


class Ajouter_P extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        compenet: "spinner",
        formModale: 'ajouter',
        spinnerCher: false,
        inputcher: '',
        listProf: [],
        id: '',
        matricule: '',
        nom: '',
        prenom: '',
        email: '',
        phone: '',
        passwordInscription: '',
        error: null,
        alert: {
            color: 'warning',
            title: 'REMARQUE',
            subject: 'Matricule Existant',
        },
    }

    //---------------------------------------------When the page loads----------------------------------------
    componentDidMount() {
        this.getListeALLProf();
    }

    //---------------------------------------------contact server----------------------------------------

    getListeALLProf = () => {
        const API_PATH = "http://127.0.0.1/project/backend/ajax/prof.php";
        this.setState({
            spinnerCher: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-all-prof-for-admin',
            }
        })
            .then(result => {
                this.setState({
                    compenet: 'home',
                    listProf: result.data,
                    spinnerCher: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getCherProf = (mote) => {
        const API_PATH = "http://127.0.0.1/project/backend/ajax/prof.php";
        this.setState({
            spinnerCher: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-cher-prof-for-admin',
                moteDeCHer: mote
            }
        })
            .then(result => {
                this.setState({
                    compenet: 'home',
                    listProf: result.data,
                    spinnerCher: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    AddProf = () => {
        if (this.state.matricule && this.state.nom && this.state.prenom && this.state.passwordInscription) {
            const API_PATH = "http://127.0.0.1/project/backend/ajax/prof.php";
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'add-prof',
                    matricule: this.state.matricule,
                    nom: this.state.nom,
                    prenom: this.state.prenom,
                    passwordInscription: this.state.passwordInscription
                }
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data === "M_NotUnique") {
                        this.setState({
                            error: 'notUnique',
                            matricule: ''
                        });
                        this.funHidenAlert(3000);
                    }
                    if (result.data === false) {
                        this.setState({
                            error: 'error',
                            alert: {
                                color: 'danger',
                                title: 'error',
                                subject: 'une erreur est survenue',
                            }
                        });
                        this.funHidenAlert(4000);
                    }
                    if (result.data === true) {
                        this.setState({
                            matricule: '',
                            nom: '',
                            prenom: '',
                            passwordInscription: (Math.floor(Math.random() * 100) + '' + Date.now()).toString(),
                            error: 'false',
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'Ajouté avec succès',
                            }
                        });
                        this.getListeALLProf();
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));
        }

    };

    modiferInfoProf = () => {
        if (this.state.matricule && this.state.id && this.state.nom && this.state.prenom && this.state.passwordInscription) {
            const API_PATH = "http://127.0.0.1/project/backend/ajax/prof.php";
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'modifer-info-prof',
                    id: this.state.id,
                    matricule: this.state.matricule,
                    nom: this.state.nom,
                    prenom: this.state.prenom,
                    passwordInscription: this.state.passwordInscription
                }
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data === "M_NotUnique") {
                        this.setState({
                            error: 'notUnique',
                            matricule: ''
                        });
                        this.funHidenAlert(3000);
                    }
                    if (result.data === false) {
                        this.setState({
                            error: 'error',
                            alert: {
                                color: 'danger',
                                title: 'error',
                                subject: 'une erreur est survenue',
                            }
                        });
                        this.funHidenAlert(4000);
                    }
                    if (result.data === true) {
                        this.setState({
                            error: 'false',
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'Modifié',
                            }
                        });
                        this.getListeALLProf();
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));
        }

    };
    // ----------------------------------------------- Component --------------------------------------

    FunComponentMain = () => {
        return (
            <Fragment>
                <div className="my-3  float-left">
                    <span className="float-left btn mr-5" onClick={() => this.props.funChangePage('home')} >
                        <i className="fas fa-arrow-left  text-muted mt-2 "></i>
                    </span>
                    <span className=" text-muted h3">
                        Ajouter des prof
                </span>
                </div>
                <div className="mb-4  text-right pt-3 pr-3">
                        <button type="button" className="btn btn-outline-success py-2 mb-3" data-toggle="modal" data-target=".exampleModal"
                            onClick={() => this.funChangeTypeModal('ajouter')}>
                            <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                            Ajouter une prof
                        </button>
                    </div>
                <div className="w-100 my-5" >
                    <div className="col-12 mt-3">
                        <div className="input-group mb-2">
                            <input type="text" className="form-control" placeholder="Rechercher un (nom)prof"
                                aria-label="Rechercher un enseignant" aria-describedby="button-addon2"
                                onChange={this.funchangeInputCherch} value={this.state.inputcher} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                        {
                            this.state.listProf != null && this.state.listProf.length != 0 ?
                                <Fragment>
                                    {this.state.spinnerCher === true ? <Spinner />
                                        : this.FunComponentListeProf()}
                                </Fragment>
                                :
                                <Fragment>
                                    <div className="text-center text-muted m-5 p-5">
                                        Il n'y a aucun prof à afficher
                                    </div>
                                </Fragment>
                        }

                    </div>


                </div>

                {this.FunComponentModale()}

            </Fragment>
        );
    }

    FunComponentListeProf = () => {
        return (
            <Fragment>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Matricule</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prenom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.itemListProf()
                        }
                    </tbody>
                </table>
            </Fragment>
        );
    }

    FunComponentModale = () => {
        return (
            this.state.formModale === 'ajouter' ?
                <Fragment>
                    <div className="modal fade exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Ajouter un prof </h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {(this.state.error === null) ? "" : <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} />}
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name1" className="col-form-label">Matricule:</label>
                                            <input type="text" className="form-control" id="recipient-name1"
                                                value={this.state.matricule} onChange={this.funChangeInputMatricule} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name2" className="col-form-label">Nom:</label>
                                            <input type="text" className="form-control" id="recipient-name2"
                                                value={this.state.nom} onChange={this.funChangeInputNom} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name3" className="col-form-label">Prenom:</label>
                                            <input type="text" className="form-control" id="recipient-name3"
                                                value={this.state.prenom} onChange={this.funChangeInputPrenom} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name4" className="col-form-label">Mot de pass inscription:</label>
                                            <input type="text" className="form-control"
                                                value={this.state.passwordInscription + ""} id="recipient-name4" disabled />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                    <button type="button" className="btn btn-primary" onClick={() => this.AddProf()}>Ajouter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
                :
                <Fragment>
                    <div className="modal fade exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">modifier information </h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {(this.state.error === null) ? "" : <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} />}
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="recipient-nameERw1" className="col-form-label">Matricule:</label>
                                            <input type="text" className="form-control" id="recipient-nameERw1"
                                                value={this.state.matricule} onChange={this.funChangeInputMatricule} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-nameERw2" className="col-form-label">Nom:</label>
                                            <input type="text" className="form-control" id="recipient-nameERw2"
                                                value={this.state.nom} onChange={this.funChangeInputNom} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-nameERw3" className="col-form-label">Prenom:</label>
                                            <input type="text" className="form-control" id="recipient-nameERw3"
                                                value={this.state.prenom} onChange={this.funChangeInputPrenom} />
                                        </div>
                                        {this.state.email ?
                                            <div className="form-group">
                                                <label htmlFor="recipient-nameERw5" className="col-form-label">Email:</label>
                                                <input type="text" className="form-control" id="recipient-nameERw5" disabled
                                                    value={this.state.email} />
                                            </div>
                                            : ''
                                        }
                                        {this.state.phone ?
                                            <div className="form-group">
                                                <label htmlFor="recipient-nameERw6" className="col-form-label">Phone:</label>
                                                <input type="text" className="form-control" id="recipient-nameERw6" disabled
                                                    value={this.state.phone} />
                                            </div>
                                            : ''
                                        }
                                        <div className="form-group">
                                            <label htmlFor="recipient-nameERw4" className="col-form-label">Mot de pass inscription:</label>
                                            <div className="input-group mb-2">
                                                <input type="text" className="form-control" id="recipient-nameERw4" disabled
                                                    value={this.state.passwordInscription} />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                                                        onClick={() => this.funChangeInputPasswordInscription()}>
                                                        <i className="fas fa-fw fa-sync-alt"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                    <button type="button" className="btn btn-success" onClick={() => this.modiferInfoProf()}>Mdifier</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
        );
    }

    itemListProf = () => {
        const Resalt = this.state.listProf.map(item => {
            return (
                <tr data-toggle="modal" data-target=".exampleModal" key={item.id}
                    onClick={() => this.getInfoProfInItemList(item.id)}>
                    <th scope="row">{item.id}</th>
                    <td>{item.matricule}</td>
                    <td>{item.nom}</td>
                    <td>{item.prenom}</td>
                </tr>

            );
        });
        return Resalt;
    }


    // -------------------------------------------- render ------------------------------------------
    render() {
        return (
            this.state.compenet === 'home' ?
                this.FunComponentMain()
                :
                <Spinner />
        );

    }
    // -------------------------------------------- function ------------------------------------------
    funChangeTypeModal = (type) => {
        let passwordInscription = "";
        if (type === 'ajouter') passwordInscription = (Math.floor(Math.random() * 100) + '' + Date.now()).toString();
        this.setState({
            formModale: type,
            id: '',
            matricule: '',
            nom: '',
            prenom: '',
            email: '',
            phone: '',
            passwordInscription: passwordInscription
        });
    }

    funChangeInputMatricule = (e) => {
        this.setState({
            matricule: e.target.value
        });
    }

    funChangeInputNom = (e) => {
        this.setState({
            nom: e.target.value
        });
    }

    funChangeInputPrenom = (e) => {
        this.setState({
            prenom: e.target.value
        });
    }

    getInfoProfInItemList = (idProf) => {
        this.funChangeTypeModal('modifer');
        const { id, matricule, nom, prenom, email, phone, password_inscription } =
            this.state.listProf.filter(item => item.id === idProf)[0];
        this.setState({
            id: id,
            matricule: matricule,
            nom: nom,
            prenom: prenom,
            phone: phone,
            email: email,
            passwordInscription: password_inscription

        });
        console.log(email);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    funChangeInputPasswordInscription = (e) => {
        this.setState({
            passwordInscription: (Math.floor(Math.random() * 100) + '' + Date.now()).toString()
        });
    }

    funchangeInputCherch = (e) => {
        this.setState({
            inputcher: e.target.value.trim()
        });
        if (e.target.value.trim()) {
            this.getCherProf(e.target.value.trim());
        } else {
            this.getListeALLProf();
        }

    }
    // -------------------------------- Alert -----------------------------------------
    funHidenAlert = async (time) => {
        await this.sleep(time);
        this.setState({
            error: null,
            alert: {
                color: 'warning',
                title: 'REMARQUE',
                subject: 'Matricule Existant',
            }
        });
    }




}

export default Ajouter_P;