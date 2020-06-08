import React, { Fragment, Component } from 'react';
import Spinner from "./../helpers/spinner";
import Alert from "./../helpers/alert";
import HOST from "./../helpers/host";


import axios from "axios";


class Ajouter_M extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        compenet: "spinner",
        formModale: 'ajouter',
        spinnerSearchSpec: false,
        spinnerSearchModule: false,
        inputcher: '',
        listSpec: [],
        listModule: [],
        id: '',
        nom_module: '',
        fondamentale: 'oui',
        coef: '',
        semestre: '1',
        id_specialite: '',
        specialite: '',
        error: null,
        alert: {
            color: 'warning',
            title: 'REMARQUE',
            subject: 'nom specialite Existant',
        },
    }

    //---------------------------------------------When the page loads----------------------------------------
    componentDidMount() {
        this.getListeALLModule();
    }

    //---------------------------------------------contact server----------------------------------------

    getListeALLSpec = () => {
        const API_PATH = HOST + "/project/backend/ajax/faculty.php";
        this.setState({
            spinnerSearchSpec: true
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
                    compenet: 'home',
                    listSpec: result.data,
                    spinnerSearchModule: false,
                    spinnerSearchSpec: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getListeALLModule = () => {
        const API_PATH = HOST + "/project/backend/ajax/faculty.php";
        this.setState({
            spinnerSearchModule: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-all-module-for-admin',
            }
        })
            .then(result => {
                this.setState({
                    listModule: result.data,
                });
                this.getListeALLSpec();
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getCherModule = (mote) => {
        const API_PATH = HOST + "/project/backend/ajax/faculty.php";
        this.setState({
            spinnerSearchModule: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-cher-module',
                moteDeCHer: mote
            }
        })
            .then(result => {
                this.setState({
                    compenet: 'home',
                    listModule: result.data,
                    spinnerSearchModule: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getCherSpec = (mote) => {
        const API_PATH = HOST + "/project/backend/ajax/faculty.php";
        this.setState({
            spinnerSearchSpec: true
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
                    spinnerSearchSpec: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));
    };

    AddModule = () => {
        console.log(this.state);
        if (this.state.nom_module && this.state.fondamentale && this.state.coef
            && this.state.semestre && this.state.id_specialite) {
            const API_PATH = HOST + "/project/backend/ajax/faculty.php";
            console.log(this.state.id_profResponsable);
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'add-module',
                    nom_module: this.state.nom_module,
                    fondamentale: this.state.fondamentale,
                    coef: this.state.coef,
                    semestre: this.state.semestre,
                    id_specialite: this.state.id_specialite
                }
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data === "M_NotUnique") {
                        this.setState({
                            error: 'notUnique',
                            nom_module: ''
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
                            nom_module: '',
                            fondamentale: 'oui',
                            coef: '',
                            semestre: '1',
                            id_specialite: '',
                            specialite: '',
                            error: 'false',
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'Ajouté avec succès',
                            }
                        });
                        this.getListeALLModule();
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));
        }

    };

    modiferInfoModule = () => {
        if (this.state.id && this.state.nom_module && this.state.fondamentale && this.state.coef
            && this.state.semestre && this.state.id_specialite) {
            const API_PATH = HOST + "/project/backend/ajax/faculty.php";
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'modifer-info-module',
                    id: this.state.id,
                    nom_module: this.state.nom_module,
                    fondamentale: this.state.fondamentale,
                    coef: this.state.coef,
                    semestre: this.state.semestre,
                    id_specialite: this.state.id_specialite
                }
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data === "M_NotUnique") {
                        this.setState({
                            error: 'notUnique',
                            nom_module: ''
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
                        this.getListeALLModule();
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
                        Ajouter des modules
                </span>
                </div>
                <div className="mb-4  text-right pt-3 pr-3">
                    <button type="button" className="btn btn-outline-success py-2 mb-3" data-toggle="modal" data-target=".exampleModal"
                        onClick={() => this.funChangeTypeModal('ajouter')}>
                        <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                            Ajouter une module
                        </button>
                </div>
                <div className="w-100 my-5">

                    <div className="col-12 mt-3">
                        <div className="input-group mb-2">
                            <input type="text" className="form-control" placeholder="Rechercher un module"
                                aria-label="Rechercher un enseignant" aria-describedby="button-addon2"
                                onChange={this.funchangeInputCherchModule} value={this.state.inputcher} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                        {
                            this.state.listModule != null && this.state.listModule.length != 0 ?
                                <Fragment>
                                    {this.state.spinnerSearchModule === true ? <Spinner />
                                        :
                                        this.FunComponentListeModule()
                                    }
                                </Fragment>
                                :
                                <Fragment>
                                    <div className="text-center text-muted m-5 p-5">
                                        Il n'y a aucun module à afficher
                                    </div>
                                </Fragment>
                        }

                    </div>


                </div>

                {this.FunComponentModale()}

            </Fragment>
        );
    }

    FunComponentListeModule = () => {
        return (
            <Fragment>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">nom</th>
                            <th scope="col">semestre</th>
                            <th scope="col">nom specialite</th>
                            <th scope="col">annee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.itemListModule()
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
                                    <h5 className="modal-title" id="exampleModalLabel">Ajouter un module </h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {(this.state.error === null) ? "" : <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} />}
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name1" className="col-form-label">nom module:</label>
                                            <input type="text" className="form-control" id="recipient-name1"
                                                value={this.state.nom_module} onChange={this.funChangeInputNomModule} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name2" className="col-form-label">fondamentale:</label>
                                            <select className="form-control" value={this.state.fondamentale} onChange={this.funChangeInputFondamentale}>
                                                <option value="oui">oui</option>
                                                <option value="non">non</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name321" className="col-form-label">coefition:</label>
                                            <input type="number" className="form-control" id="recipient-name321"
                                                value={this.state.coef} onChange={this.funChangeInputCoef} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-naaame2" className="col-form-label">semestre:</label>
                                            <select className="form-control" value={this.state.semestre} onChange={this.funChangeInputSemestre}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name3" className="col-form-label">specialite:</label>
                                            <div className="w-100 select-search">
                                                {
                                                    this.state.specialite ?
                                                        <Fragment>
                                                            <div className="input-group mb-2">
                                                                <input type="text" className="form-control" id="recipient-nameERw4" disabled
                                                                    value={this.state.specialite} />
                                                                <div className="input-group-append">
                                                                    <button className="btn btn-outline-danger" type="button" id="button-addon2"
                                                                        onClick={() => this.funEmptyInputSpec()}>
                                                                        <i className="fas fa-times"></i></button>
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                        :
                                                        <Fragment>
                                                            <input type="text" className="form-control" id="recipient-na"
                                                                onChange={this.funchangeInputsearchspec} placeholder="Rechercher un specialite" />
                                                            <div className="w-100 bg-light div-select-search">
                                                                {
                                                                    this.state.listSpec != null && this.state.listSpec.length != 0 ?
                                                                        <Fragment>
                                                                            {this.state.spinnerSearchProf === true ? <Spinner />
                                                                                : this.itemListSpec()}
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
                                    <button type="button" className="btn btn-primary" onClick={() => this.AddModule()}>Ajouter</button>
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
                                            <label htmlFor="recipient-name1" className="col-form-label">nom module:</label>
                                            <input type="text" className="form-control" id="recipient-name1"
                                                value={this.state.nom_module} onChange={this.funChangeInputNomModule} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name2" className="col-form-label">fondamentale:</label>
                                            <select className="form-control" value={this.state.fondamentale} onChange={this.funChangeInputFondamentale}>
                                                <option value="oui">oui</option>
                                                <option value="non">non</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name321" className="col-form-label">coefition:</label>
                                            <input type="number" className="form-control" id="recipient-name321"
                                                value={this.state.coef} onChange={this.funChangeInputCoef} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-naaame2" className="col-form-label">semestre:</label>
                                            <select className="form-control" value={this.state.semestre} onChange={this.funChangeInputSemestre}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name3" className="col-form-label">specialite:</label>
                                            <div className="w-100 select-search">
                                                {
                                                    this.state.specialite ?
                                                        <Fragment>
                                                            <div className="input-group mb-2">
                                                                <input type="text" className="form-control" id="recipient-nameERw4" disabled
                                                                    value={this.state.specialite} />
                                                                <div className="input-group-append">
                                                                    <button className="btn btn-outline-danger" type="button" id="button-addon2"
                                                                        onClick={() => this.funEmptyInputSpec()}>
                                                                        <i className="fas fa-times"></i></button>
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                        :
                                                        <Fragment>
                                                            <input type="text" className="form-control" id="recipient-na"
                                                                onChange={this.funchangeInputsearchspec} placeholder="Rechercher un specialite" />
                                                            <div className="w-100 bg-light div-select-search">
                                                                {
                                                                    this.state.listSpec != null && this.state.listSpec.length != 0 ?
                                                                        <Fragment>
                                                                            {this.state.spinnerSearchProf === true ? <Spinner />
                                                                                : this.itemListSpec()}
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
                                    <button type="button" className="btn btn-success" onClick={() => this.modiferInfoModule()}>Mdifier</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
        );
    }

    itemListModule = () => {
        const Resalt = this.state.listModule.map(item => {
            return (
                <tr data-toggle="modal" data-target=".exampleModal" key={item.id}
                    onClick={() => this.getInfoModuleInItemList(item.id)}>
                    <th scope="row">{item.id}</th>
                    <td>{item.nom_module}</td>
                    <td>{item.semestre}</td>
                    <td>{item.nom_spec}</td>
                    <td>{item.annee}</td>
                </tr>

            );
        });
        return Resalt;
    }

    itemListSpec = () => {
        const Resalt = this.state.listSpec.map(item => {
            return (
                <div className="w-100 item-search pl-3 py-1"
                    key={item.id} onClick={() => this.funChangeInputSpec({
                        id_specialite: item.id,
                        specialite: item.nom_spec
                    })}>
                    {item.nom_spec}
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
            nom_module: '',
            fondamentale: 'oui',
            coef: '',
            semestre: '1',
            id_specialite: '',
            specialite: '',
        });
    }

    funChangeInputNomModule = (e) => {
        this.setState({
            nom_module: e.target.value
        });
    }

    funChangeInputCoef = (e) => {
        this.setState({
            coef: e.target.value
        });
    }

    funChangeInputSemestre = (e) => {
        this.setState({
            semestre: e.target.value
        });
    }

    funChangeInputFondamentale = (e) => {
        this.setState({
            fondamentale: e.target.value
        });
    }

    funChangeInputSpec = (val) => {
        this.setState({
            id_specialite: val.id_specialite,
            specialite: val.specialite
        });
    }

    funEmptyInputSpec = () => {
        this.setState({
            id_specialite: '',
            specialite: ''
        });
        this.getListeALLModule();
    }

    getInfoModuleInItemList = (idModule) => {
        console.log();
        this.funChangeTypeModal('modifer');
        const { id, nom_module, fondamentale, coef, semestre, id_specialite, nom_spec } =
            this.state.listModule.filter(item => item.id === idModule)[0];
        this.setState({
            id: id,
            nom_module: nom_module,
            fondamentale: fondamentale,
            coef: coef,
            semestre: semestre,
            id_specialite: id_specialite,
            specialite: nom_spec

        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    funchangeInputCherchModule = (e) => {
        this.setState({
            inputcher: e.target.value.trim()
        });
        if (e.target.value.trim()) {
            this.getCherModule(e.target.value.trim());
        } else {
            this.getListeALLModule();
        }

    }

    funchangeInputsearchspec = (e) => {
        if (e.target.value.trim()) {
            this.getCherSpec(e.target.value.trim());
        } else {
            this.getListeALLModule();
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

export default Ajouter_M;