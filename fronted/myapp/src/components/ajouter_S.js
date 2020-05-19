import React, { Fragment, Component } from 'react';
import Spinner from "./../helpers/spinner";
import Alert from "./../helpers/alert";


import axios from "axios";


class Ajouter_S extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        compenet: "spinner",
        formModale: 'ajouter',
        spinnerCherSpec: false,
        spinnerSearchProf: false,
        h: 'L3',
        inputcher: '',
        listSpec: [],
        listProf: [],
        id: '',
        nom_spec: 'hahah',
        annee: 'L2',
        id_profResponsable: '2',
        profResponsable: 'hamid',
        error: null,
        alert: {
            color: 'warning',
            title: 'REMARQUE',
            subject: 'nom specialite Existant',
        },
    }

    //---------------------------------------------When the page loads----------------------------------------
    componentDidMount() {
        this.getListeALLSpec();
        console.log(this.state);
    }

    //---------------------------------------------contact server----------------------------------------

    getListeALLSpec = () => {
        const API_PATH = "http://127.0.0.1/project/backend/ajax/faculty.php";
        this.setState({
            spinnerCherSpec: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-all-spec-for-admin',
            }
        })
            .then(result => {
                this.setState({
                    listSpec: result.data,
                });
                this.getListeALLProf();
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getListeALLProf = () => {
        const API_PATH = "http://127.0.0.1/project/backend/ajax/prof.php";
        this.setState({
            spinnerCherSpec: true
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
                    spinnerCherSpec: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getCherSpec = (mote) => {
        const API_PATH = "http://127.0.0.1/project/backend/ajax/faculty.php";
        this.setState({
            spinnerCherSpec: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-cher-spec',
                moteDeCHer: mote
            }
        })
            .then(result => {
                this.setState({
                    compenet: 'home',
                    listSpec: result.data,
                    spinnerCherSpec: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getCherProf = (mote) => {
        const API_PATH = "http://127.0.0.1/project/backend/ajax/prof.php";
        this.setState({
            spinnerSearchProf: true
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
                    spinnerSearchProf: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    AddSpec = () => {
        if (this.state.nom_spec && this.state.annee && this.state.profResponsable) {
            const API_PATH = "http://127.0.0.1/project/backend/ajax/faculty.php";
            console.log(this.state.id_profResponsable);
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'add-spec',
                    nom_spec: this.state.nom_spec,
                    annee: this.state.annee,
                    id_profResponsable: this.state.id_profResponsable
                }
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data === "M_NotUnique") {
                        this.setState({
                            error: 'notUnique',
                            nom_spec: ''
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
                            id: '',
                            nom_spec: '',
                            annee: '',
                            id_profResponsable: '',
                            profResponsable: '',
                            error: 'false',
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'Ajouté avec succès',
                            }
                        });
                        this.getListeALLSpec();
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));
        }

    };

    modiferInfoSpec = () => {
        if (this.state.id && this.state.nom_spec && this.state.annee && this.state.id_profResponsable && this.state.profResponsable) {
            const API_PATH = "http://127.0.0.1/project/backend/ajax/faculty.php";
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'modifer-info-spic',
                    id: this.state.id,
                    nom_spec: this.state.nom_spec,
                    annee: this.state.annee,
                    id_profResponsable: this.state.id_profResponsable,
                }
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data === "M_NotUnique") {
                        this.setState({
                            error: 'notUnique',
                            nom_spec: ''
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
                        this.getListeALLSpec();
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
                        Ajouter des specialite
                </span>
                </div>
                <div className="mb-4  text-right pt-3 pr-3">
                    <button type="button" className="btn btn-outline-success py-2 mb-3" data-toggle="modal" data-target=".exampleModal"
                        onClick={() => this.funChangeTypeModal('ajouter')}>
                        <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                            Ajouter une specialite
                        </button>
                </div>
                <div className="w-100 my-5">

                    <div className="col-12 mt-3">
                        <div className="input-group mb-2">
                            <input type="text" className="form-control" placeholder="Rechercher un (prenom)etudiant"
                                aria-label="Rechercher un enseignant" aria-describedby="button-addon2"
                                onChange={this.funchangeInputCherchSpec} value={this.state.inputcher} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                        {
                            this.state.listSpec != null && this.state.listSpec.length != 0 ?
                                <Fragment>
                                    {this.state.spinnerCherSpec === true ? <Spinner />
                                        : this.FunComponentListeSpec()}
                                </Fragment>
                                :
                                <Fragment>
                                    <div className="text-center text-muted m-5 p-5">
                                        Il n'y a aucun specialite à afficher
                                    </div>
                                </Fragment>
                        }

                    </div>


                </div>

                {this.FunComponentModale()}

            </Fragment>
        );
    }

    FunComponentListeSpec = () => {
        return (
            <Fragment>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">nom specialite</th>
                            <th scope="col">annee</th>
                            <th scope="col">prof responsable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.itemListSpec()
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
                                    <h5 className="modal-title" id="exampleModalLabel">Ajouter un specialite </h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {(this.state.error === null) ? "" : <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} />}
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name1" className="col-form-label">nom specialite:</label>
                                            <input type="text" className="form-control" id="recipient-name1"
                                                value={this.state.nom_spec} onChange={this.funChangeInputNomSpec} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name2" className="col-form-label">annee:</label>
                                            <select className="form-control" value={this.state.annee} onChange={this.funChangeInputAnnee}>
                                                <option value="L1">L1</option>
                                                <option value="L2">L2</option>
                                                <option value="L3">L3</option>
                                                <option value="M1">M1</option>
                                                <option value="M2">M2</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name3" className="col-form-label">prof responsable:</label>
                                            <div className="w-100 select-search">
                                                {
                                                    this.state.profResponsable ?
                                                        <Fragment>
                                                            <div className="input-group mb-2">
                                                                <input type="text" className="form-control" id="recipient-nameERw4" disabled
                                                                    value={this.state.profResponsable} />
                                                                <div className="input-group-append">
                                                                    <button className="btn btn-outline-danger" type="button" id="button-addon2"
                                                                        onClick={() => this.funEmptyInputProfResponsable()}>
                                                                        <i className="fas fa-times"></i></button>
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                        :
                                                        <Fragment>
                                                            <input type="text" className="form-control" id="recipient-na"
                                                                onChange={this.funchangeInputsearchProf} placeholder="Rechercher un (nom)prof" />
                                                            <div className="w-100 bg-light div-select-search">
                                                                {
                                                                    this.state.listProf != null && this.state.listProf.length != 0 ?
                                                                        <Fragment>
                                                                            {this.state.spinnerSearchProf === true ? <Spinner />
                                                                                : this.itemListProf()}
                                                                        </Fragment>
                                                                        :
                                                                        <Fragment>
                                                                            <div className="text-center text-muted m-1 p-1">
                                                                                Il n'y a aucun prof à afficher
                                                                            </div>
                                                                        </Fragment>
                                                                }

                                                            </div>
                                                        </Fragment>
                                                }

                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                    <button type="button" className="btn btn-primary" onClick={() => this.AddSpec()}>Ajouter</button>
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
                                            <label htmlFor="recipient-name1" className="col-form-label">nom specialite:</label>
                                            <input type="text" className="form-control" id="recipient-name1"
                                                value={this.state.nom_spec} onChange={this.funChangeInputNomSpec} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name2" className="col-form-label">annee:</label>
                                            <select className="form-control" value={this.state.annee} onChange={this.funChangeInputAnnee}>
                                                <option value="L1">L1</option>
                                                <option value="L2">L2</option>
                                                <option value="L3">L3</option>
                                                <option value="M1">M1</option>
                                                <option value="M2">M2</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name3" className="col-form-label">prof responsable:</label>
                                            <div className="w-100 select-search">
                                                {
                                                    this.state.profResponsable ?
                                                        <Fragment>
                                                            <div className="input-group mb-2">
                                                                <input type="text" className="form-control" id="recipient-nameERw4" disabled
                                                                    value={this.state.profResponsable} />
                                                                <div className="input-group-append">
                                                                    <button className="btn btn-outline-danger" type="button" id="button-addon2"
                                                                        onClick={() => this.funEmptyInputProfResponsable()}>
                                                                        <i className="fas fa-times"></i></button>
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                        :
                                                        <Fragment>
                                                            <input type="text" className="form-control" id="recipient-na"
                                                                onChange={this.funchangeInputsearchProf} placeholder="Rechercher un (nom)prof" />
                                                            <div className="w-100 bg-light div-select-search">
                                                                {
                                                                    this.state.listProf != null && this.state.listProf.length != 0 ?
                                                                        <Fragment>
                                                                            {this.state.spinnerSearchProf === true ? <Spinner />
                                                                                : this.itemListProf()}
                                                                        </Fragment>
                                                                        :
                                                                        <Fragment>
                                                                            <div className="text-center text-muted m-1 p-1">
                                                                                Il n'y a aucun prof à afficher
                                                                            </div>
                                                                        </Fragment>
                                                                }

                                                            </div>
                                                        </Fragment>
                                                }

                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                    <button type="button" className="btn btn-success" onClick={() => this.modiferInfoSpec()}>Mdifier</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
        );
    }

    itemListSpec = () => {
        const Resalt = this.state.listSpec.map(item => {
            return (
                <tr data-toggle="modal" data-target=".exampleModal" key={item.id}
                    onClick={() => this.getInfoSpecInItemList(item.id)}>
                    <th scope="row">{item.id}</th>
                    <td>{item.nom_spec}</td>
                    <td>{item.annee}</td>
                    <td>{item.nom + " " + item.prenom}</td>
                </tr>

            );
        });
        return Resalt;
    }

    itemListProf = () => {
        const Resalt = this.state.listProf.map(item => {
            return (
                <div className="w-100 item-search pl-3 py-1"
                    key={item.id} onClick={() => this.funChangeInputProfResponsable({
                        id_profResponsable: item.id,
                        nomPrenom: item.nom + " " + item.prenom
                    })}>
                    {item.nom + " " + item.prenom}
                </div>
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
        this.setState({
            formModale: type,
            id: '',
            nom_spec: '',
            annee: 'L2',
            id_profResponsable: '',
            profResponsable: '',
        });
    }

    funChangeInputNomSpec = (e) => {
        this.setState({
            nom_spec: e.target.value
        });
    }

    funChangeInputAnnee = (e) => {
        this.setState({
            annee: e.target.value
        });
    }

    funChangeInputProfResponsable = (val) => {
        this.setState({
            id_profResponsable: val.id_profResponsable,
            profResponsable: val.nomPrenom
        });
    }

    funEmptyInputProfResponsable = () => {
        this.setState({
            id_profResponsable: '',
            profResponsable: ''
        });
        this.getListeALLProf();
    }

    getInfoSpecInItemList = (idSpec) => {
        this.funChangeTypeModal('modifer');
        const { id, nom_spec, annee, email, id_profResponsable, nom, prenom } =
            this.state.listSpec.filter(item => item.id === idSpec)[0];
        this.setState({
            id: id,
            nom_spec: nom_spec,
            annee: annee,
            id_profResponsable: id_profResponsable,
            profResponsable: nom + " " + prenom


        });
        console.log(email);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    funchangeInputCherchSpec = (e) => {
        this.setState({
            inputcher: e.target.value.trim()
        });
        if (e.target.value.trim()) {
            this.getCherSpec(e.target.value.trim());
        } else {
            this.getListeALLSpec();
        }

    }

    funchangeInputsearchProf = (e) => {
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
                subject: 'nom specialite Existant',
            }
        });
    }




}

export default Ajouter_S;