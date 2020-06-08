import React, { Fragment, Component } from 'react';
import Spinner from "./../helpers/spinner";
import Alert from "./../helpers/alert";
import HOST from "./../helpers/host";
import axios from "axios";

class Affectation extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        compenet: "Etudiant",
        spinner: false,
        spinnerCher: false,
        spinnerModal: false,
        modal: 'ajouterProf',
        listProf: [],
        listEtudiant: [],
        listEtudiantGroup: [],
        listProfGroup: [],
        listModule: [],
        id: '',
        nomPrenom: '',
        idModule: '',
        module: '',
        role: 'td',
        error: null,
        semestre: '1',
        idHstoriqueProf: '',
        alert: {
            color: 'warning',
            title: 'REMARQUE',
            subject: 'nom specialite Existant',
        },
    };

    //---------------------------------------------When the page loads----------------------------------------
    componentDidMount() {
        this.getListeALLEtudiantGroup();
        this.setState({
            semestre: this.props.semestre
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.semestre != this.state.semestre) {
            this.setState({
                semestre: prevProps.semestre
            });
            this.getListeALLProfGroup(prevProps.semestre);
            // console.log(prevProps.semestre , this.state.semestre);
        }
    }

    //---------------------------------------------contact server----------------------------------------
    getListeALLProfGroup = (semestre) => {
        const API_PATH = HOST + "/project/backend/ajax/prof.php";
        this.setState({
            spinner: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'affectation-get-all-prof-group',
                idGrp: this.props.idGroup,
                annee: this.props.year.id,
                semestre: semestre
            }
        })
            .then(result => {
                this.setState({
                    listProfGroup: result.data,
                    spinner: false
                });
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getListeALLProf = () => {
        const API_PATH = HOST + "/project/backend/ajax/prof.php";
        this.setState({
            spinnerModal: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'affectation-get-all-prof',
            }
        })
            .then(result => {
                this.setState({
                    listProf: result.data,
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getListeModule = () => {
        const API_PATH = HOST + "/project/backend/ajax/faculty.php";
        this.setState({
            spinnerModal: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'affectation-get-module',
                idGrp: this.props.idGroup,
                semestre: this.props.year.semestre
            }
        })
            .then(result => {
                this.setState({
                    listModule: result.data,
                    spinnerModal: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getListeALLEtudiantGroup = () => {
        const API_PATH = HOST + "/project/backend/ajax/etudiant.php";
        this.setState({
            spinner: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'affectation-get-all-etudiant-group',
                idGrp: this.props.idGroup,
                annee: this.props.year.id
            }
        })
            .then(result => {
                this.setState({
                    listEtudiantGroup: result.data,
                    spinner: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getListeALLEtudiant = () => {
        const API_PATH = HOST + "/project/backend/ajax/etudiant.php";
        this.setState({
            spinnerModal: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'affectation-get-all-etudiant',
                idGrp: this.props.idGroup,
                annee: this.props.year.id
            }
        })
            .then(result => {
                this.setState({
                    listEtudiant: result.data,
                    spinnerModal: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    affecterEtudiantInGroup = () => {
        if (this.state.nomPrenom) {
            const API_PATH = HOST + "/project/backend/ajax/etudiant.php";
            this.setState({
                spinner: true
            });
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'affecter-etudiant-in-group',
                    id: this.state.id,
                    idGrp: this.props.idGroup,
                    annee: this.props.year.id
                }
            })
                .then(result => {
                    if (result.data === false) {
                        this.setState({
                            error: 'error',
                            spinner: false,
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
                            id: '',
                            nomPrenom: '',
                            error: 'false',
                            spinner: false,
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'Ajouté avec succès',
                            }
                        });
                        this.getListeALLEtudiantGroup();
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));
        }
    };

    affecterProfInGroup = () => {
        if (this.state.nomPrenom && this.state.modal && this.state.role) {
            console.log("2017");
            const API_PATH = HOST + "/project/backend/ajax/prof.php";
            this.setState({
                spinner: true
            });
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'affecter-prof-in-group',
                    idProf: this.state.id,
                    idGrp: this.props.idGroup,
                    idModule: this.state.idModule,
                    role: this.state.role,
                    semestre: this.props.year.semestre,
                    annee: this.props.year.id
                }
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data === false) {
                        this.setState({
                            spinner: false,
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
                            spinner: false,
                            id: '',
                            nomPrenom: '',
                            module: '',
                            idModule: '',
                            role: 'td',
                            error: 'false',
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'Ajouté avec succès',
                            }
                        });
                        this.getListeALLProfGroup(this.state.semestre);
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));
        }
    };

    modiferAffecterProfInGroup = () => {
        if (this.state.nomPrenom && this.state.module && this.state.role && this.state.idHstoriqueProf) {
            console.log("2017");
            const API_PATH = HOST + "/project/backend/ajax/prof.php";
            this.setState({
                spinner: true
            });
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'modifer-affecter-prof-in-group',
                    idProf: this.state.id,
                    idModule: this.state.idModule,
                    role: this.state.role,
                    id: this.state.idHstoriqueProf
                }
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data === false) {
                        this.setState({
                            spinner: false,
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
                            spinner: false,
                            id: '',
                            nomPrenom: '',
                            module: '',
                            idModule: '',
                            role: 'td',
                            idHstoriqueProf: '',
                            error: 'false',
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'modifer avec succès',
                            }
                        });
                        this.getListeALLProfGroup(this.state.semestre);
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));
        }
    };

    suprimerAffecterProfInGroup = () => {
        if (this.state.idHstoriqueProf) {
            console.log("2017");
            const API_PATH = HOST + "/project/backend/ajax/prof.php";
            this.setState({
                spinner: true
            });
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'suprimer-affecter-prof-in-group',
                    id: this.state.idHstoriqueProf
                }
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data === false) {
                        this.setState({
                            spinner: false,
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
                            spinner: false,
                            id: '',
                            nomPrenom: '',
                            module: '',
                            idModule: '',
                            role: 'td',
                            idHstoriqueProf: '',
                            error: 'false',
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'suprimer avec succès',
                            }
                        });
                        this.getListeALLProfGroup(this.state.semestre);
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));
        }
    };

    supprimerEtudiantInGroup = (id) => {
        const API_PATH = HOST + "/project/backend/ajax/etudiant.php";
        this.setState({
            spinner: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'supprimer-etudiant-in-group',
                id: id,
                idGrp: this.props.idGroup,
                annee: this.props.year.id
            }
        })
            .then(result => {
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
                            subject: 'supprimer avec succès',
                        }
                    });
                    this.getListeALLEtudiantGroup();
                    this.funHidenAlert(2000);
                }
            })
            .catch(error => this.setState({ error: error.message }));
    };

    getCherEtudiant = (mote) => {
        const API_PATH = HOST + "/project/backend/ajax/etudiant.php";
        this.setState({
            spinnerCher: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'affectation-get-cher',
                moteDeCHer: mote,
                idGrp: this.props.idGroup,
                annee: this.props.year.id

            }
        })
            .then(result => {
                this.setState({
                    listEtudiant: result.data,
                    spinnerCher: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    //---------------------------------------------Compenent----------------------------------------

    ComponentMain = () => {
        return (
            <Fragment>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <a className={"nav-link " + (this.state.compenet === "Etudiant" ? "activeAffectation" : "")}
                            onClick={() => this.changeState({
                                compenet: "Etudiant"
                            })}  >Etudiant</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link " + (this.state.compenet === "Prof" ? "activeAffectation" : "")}
                            onClick={() => this.funClickBtnProf()}  >Prof</a>
                    </li>
                </ul>

                <div className="mt-3">
                    {(this.state.error === null) ? "" : <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} />}
                    {this.state.compenet != "Prof"
                        ? this.ComponentEtudiant()
                        : this.ComponentProf()}
                </div>
                {this.FunComponentModaleEtudiant()}
                {this.FunComponentModaleAProf()}
            </Fragment>
        );
    }

    ComponentEtudiant = () => {
        return (
            <Fragment>
                <div className="mb-4  text-right pt-3 pr-3">
                    {this.props.year.statut != '1' ? "" :
                        <button type="button" className="btn btn-outline-success py-2 mb-3" data-toggle="modal" data-target=".exampleModal"
                            onClick={() => this.clickBtnAjouterEtudiant()}>
                            <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                            Ajouter une etudiant
                        </button>}
                </div>
                {this.state.listEtudiantGroup != null && this.state.listEtudiantGroup.length
                    ?
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Matricule</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prenom</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                {this.props.year.statut != '1' ? <Fragment></Fragment> : <th scope="col"></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {this.itemListEtudiantGroup()}
                        </tbody>
                    </table>
                    :
                    <div className="text-center text-muted m-1 p-1">
                        Il n'y a aucun etudiant à afficher
                    </div>
                }
            </Fragment>
        );
    }

    itemListEtudiantGroup = () => {
        const Resalt = this.state.listEtudiantGroup.map(item => {
            if (this.props.year.statut != '1') {
                return (
                    <Fragment key={item.id}>
                        <tr  >
                            <th scope="row">{item.id}</th>
                            <td>{item.matricule}</td>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.phone === null ? '/' : item.phone}</td>
                            <td>{item.email === null ? '/' : item.email}</td>
                        </tr>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment key={item.id}>
                        <tr >
                            <th scope="row">{item.id}</th>
                            <td>{item.matricule}</td>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.phone === null ? '/' : item.phone}</td>
                            <td>{item.email === null ? '/' : item.email}</td>
                            <td><button type="button" className="btn btn-danger"
                                onClick={() => this.supprimerEtudiantInGroup(item.id)}>supprimer</button></td>
                        </tr>
                    </Fragment>
                );
            }
        });
        return Resalt;
    }

    itemListProfGroup = () => {
        const Resalt = this.state.listProfGroup.map(item => {
            if (this.props.year.statut != '1') {
                return (
                    <Fragment key={item.idHstoriqueProf}>
                        <tr   >
                            <th scope="row">{item.id}</th>
                            <td>{item.matricule}</td>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.nom_module}</td>
                            <td>{item.role}</td>
                        </tr>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment key={item.idHstoriqueProf}>
                        <tr data-toggle={this.props.year.semestre != this.state.semestre ? "" : "modal"} data-target={this.props.year.semestre != this.state.semestre ? "" : ".exampleModalha"}
                            onClick={() => this.props.year.semestre != this.state.semestre ? "" : this.clickBtnModiferProf(item)} >
                            <th scope="row">{item.id}</th>
                            <td>{item.matricule}</td>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.nom_module}</td>
                            <td>{item.role}</td>
                        </tr>
                    </Fragment>
                );
            }

        });
        return Resalt;
    }

    itemListModalEtudiant = (list) => {
        const Resalt = list.map(item => {
            return (
                <div className="w-100 item-search pl-3 py-1"
                    key={item.id} onClick={() => this.changeState({
                        id: item.id,
                        nomPrenom: item.nom + " " + item.prenom
                    })}>
                    {item.nom + " " + item.prenom}
                </div>
            );
        });
        return Resalt;
    }

    itemListModalProf = (list) => {
        const Resalt = list.map(item => {
            return (
                <div className="w-100 item-search pl-3 py-1"
                    key={item.id} onClick={() => this.changeState({
                        id: item.id,
                        nomPrenom: item.nom + " " + item.prenom
                    })}>
                    {item.nom + " " + item.prenom}
                </div>
            );
        });
        return Resalt;
    }

    itemListModalModule = (list) => {
        const Resalt = list.map(item => {
            return (
                <div className="w-100 item-search pl-3 py-1"
                    key={item.id} onClick={() => this.changeState({
                        idModule: item.id,
                        module: item.nom_module
                    })}>
                    {item.nom_module}
                </div>
            );
        });
        return Resalt;
    }

    ComponentProf = () => {
        return (
            <Fragment>
                <div className="mb-4  text-right pt-3 pr-3">
                    {this.props.year.statut != '1' ? "" :
                        <Fragment>
                            {this.props.year.semestre != this.state.semestre ? "" :
                                <button type="button" className="btn btn-outline-success py-2 mb-3" data-toggle="modal" data-target=".exampleModalha"
                                    onClick={() => this.clickBtnAjouterProf()}>
                                    <i className="fas fa-1x fa-plus ml-1 mr-3" ></i>
                                Ajouter une prof
                               </button>}
                        </Fragment>}
                </div>

                {this.state.listProfGroup != null && this.state.listProfGroup.length
                    ?
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Matricule</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prenom</th>
                                <th scope="col">nom module</th>
                                <th scope="col">role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.itemListProfGroup()}
                        </tbody>
                    </table>
                    :
                    <div className="text-center text-muted m-1 p-1">
                        Il n'y a aucun prof à afficher
                    </div>
                }
            </Fragment>
        );
    }


    render() {

        return (
            this.state.spinner ? <Spinner /> : this.ComponentMain()
        );

    }



    FunComponentModaleEtudiant = () => {
        return (
            <div className="modal fade exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ajouter un Etudiant </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name3" className="col-form-label">Etudiant</label>
                                    <div className="w-100 select-search">
                                        {
                                            this.state.nomPrenom ?
                                                <Fragment>
                                                    <div className="input-group mb-2">
                                                        <input type="text" className="form-control" id="recipient-nameERw4" disabled
                                                            value={this.state.nomPrenom} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-outline-danger" type="button" id="button-addon2"
                                                                onClick={() => this.changeState({ id: '', nomPrenom: '' })}>
                                                                <i className="fas fa-times"></i></button>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    {this.state.spinnerModal
                                                        ? <Spinner />
                                                        : <Fragment>
                                                            <input type="text" className="form-control" id="recipient-na"
                                                                onChange={this.funchangeInputsearchEtudiant} placeholder="Rechercher un (matricule)Etudiant" />
                                                            <div className="w-100 bg-light div-select-search">
                                                                {
                                                                    this.state.listEtudiant != null && this.state.listEtudiant.length != 0 ?
                                                                        <Fragment>
                                                                            {this.state.spinnerCher === true ? <Spinner />
                                                                                : this.itemListModalEtudiant(this.state.listEtudiant)}
                                                                        </Fragment>
                                                                        :
                                                                        <Fragment>
                                                                            <div className="text-center text-muted m-1 p-1">
                                                                                Il n'y a aucun etudiant à afficher
                                                                            </div>
                                                                        </Fragment>
                                                                }

                                                            </div>
                                                        </Fragment>}
                                                </Fragment>
                                        }

                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.affecterEtudiantInGroup()}>Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    FunComponentModaleAProf = () => {
        return (
            <div className="modal fade exampleModalha" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {this.state.modal === "ajouterProf" ? "ajouter" : "modifer"} un Prof</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name3" className="col-form-label">prof</label>
                                    <div className="w-100 select-search">
                                        {
                                            this.state.nomPrenom ?
                                                <Fragment>
                                                    <div className="input-group mb-2">
                                                        <input type="text" className="form-control" id="recipient-nameERw4" disabled
                                                            value={this.state.nomPrenom} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-outline-danger" type="button" id="button-addon2"
                                                                onClick={() => this.changeState({ id: '', nomPrenom: '' })}>
                                                                <i className="fas fa-times"></i></button>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    {this.state.spinnerModal
                                                        ? <Spinner />
                                                        : <Fragment>
                                                            <input type="text" className="form-control" id="recipient-na"
                                                                placeholder="Rechercher un (matricule)Etudiant" />
                                                            <div className="w-100 bg-light div-select-search">
                                                                {
                                                                    this.state.listProf != null && this.state.listProf.length != 0 ?
                                                                        <Fragment>
                                                                            {this.state.spinnerCher === true ? <Spinner />
                                                                                : this.itemListModalProf(this.state.listProf)}
                                                                        </Fragment>
                                                                        :
                                                                        <Fragment>
                                                                            <div className="text-center text-muted m-1 p-1">
                                                                                Il n'y a aucun prof à afficher
                                                                            </div>
                                                                        </Fragment>
                                                                }

                                                            </div>
                                                        </Fragment>}
                                                </Fragment>
                                        }

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-naaame2" className="col-form-label">role:</label>
                                    <select className="form-control" value={this.state.role} onChange={this.funChangeInputRole}>
                                        <option value="cour">cour</option>
                                        <option value="td">td</option>
                                        <option value="tp">tp</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name3" className="col-form-label">module</label>
                                    <div className="w-100 select-search">
                                        {
                                            this.state.module ?
                                                <Fragment>
                                                    <div className="input-group mb-2">
                                                        <input type="text" className="form-control" id="recipient-nameERw4" disabled
                                                            value={this.state.module} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-outline-danger" type="button" id="button-addon2"
                                                                onClick={() => this.changeState({ idModule: '', module: '' })}>
                                                                <i className="fas fa-times"></i></button>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    {this.state.spinnerModal
                                                        ? <Spinner />
                                                        : <Fragment>
                                                            <input type="text" className="form-control" id="recipient-na"
                                                                placeholder="Rechercher un module" />
                                                            <div className="w-100 bg-light div-select-search">
                                                                {
                                                                    this.state.listModule != null && this.state.listModule.length != 0 ?
                                                                        <Fragment>
                                                                            {this.state.spinnerCherModule === true ? <Spinner />
                                                                                : this.itemListModalModule(this.state.listModule)}
                                                                        </Fragment>
                                                                        :
                                                                        <Fragment>
                                                                            <div className="text-center text-muted m-1 p-1">
                                                                                Il n'y a aucun module à afficher
                                                                            </div>
                                                                        </Fragment>
                                                                }

                                                            </div>
                                                        </Fragment>}
                                                </Fragment>
                                        }

                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                            {this.state.modal === "ajouterProf"
                                ? <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.affecterProfInGroup()}>Ajouter</button>
                                : <Fragment>
                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.modiferAffecterProfInGroup()}>modifer</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.suprimerAffecterProfInGroup()}>supprimer</button>
                                </Fragment>

                            }


                        </div>
                    </div>
                </div>
            </div>

        );
    }
    // -------------------------------- function -----------------------------------------



    changeState = (objet) => {
        this.setState(objet);
    }

    funchangeInputsearchEtudiant = e => {
        if (e.target.value.trim()) {
            this.getCherEtudiant(e.target.value.trim());
        } else {
            this.getListeALLEtudiant();
        }

    }

    clickBtnAjouterEtudiant = () => {
        this.setState({
            modal: 'ajouterEtudiant',
        });
        this.getListeALLEtudiant();

    }

    funChangeInputRole = e => {
        this.setState({
            role: e.target.value
        });
        console.log(e.target.value);
    }

    clickBtnModiferProf = (item) => {
        this.setState({
            modal: 'modiferProf',
            idHstoriqueProf: item.idHstoriqueProf,
            id: item.id,
            nomPrenom: item.nom + " " + item.prenom,
            module: item.nom_module,
            idModule: item.id_module,
            role: item.role

        });
    }

    clickBtnAjouterProf = () => {
        this.setState({
            modal: 'ajouterProf',
            idHstoriqueProf: '',
            id: '',
            nomPrenom: '',
            module: '',
            idModule: '',
            role: ''
        });
        this.getListeALLProf();
        this.getListeModule();
    }

    funClickBtnProf = () => {
        this.setState({
            compenet: "Prof"
        });
        this.getListeALLProfGroup(this.state.semestre)
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    // -------------------------------- Alert -----------------------------------------
    funHidenAlert = async (time) => {
        await this.sleep(time);
        this.setState({
            error: null,
            alert: {
                color: 'warning',
                title: 'REMARQUE',
                subject: 'nom specialite Existant',
            }
        });
    }



}




export default Affectation;