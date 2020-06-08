import React, { Fragment, Component } from 'react';
import Spinner from "./../helpers/spinner";
import Alert from "./../helpers/alert";
import HOST from "./../helpers/host";
import Affectation from "./../components/affectation";


import axios from "axios";


class Historique extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        compenet: "specialite",
        spinner: false,
        listSpec: [],
        idSpec: '',
        nomSpec: '',
        listSection: [],
        idSection: '',
        nomSection: '',
        listGroup: [],
        idGroup: '',
        nomGroup: '',
        listModule: [],
        listProf: [],
        listEtudiant: [],
        typeUserAffectation: '',
        modal: '',
        typeModal: '',
        semestre: '1',
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
        this.setState({ semestre: this.props.year.semestre });
    }

    //---------------------------------------------contact server----------------------------------------

    getListeALLSpec = () => {
        const API_PATH = HOST + "/project/backend/ajax/faculty.php";
        this.setState({
            spinner: true
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
                    spinner: false
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getListeSection = (idSpec) => {
        const API_PATH = HOST + "/project/backend/ajax/faculty.php";
        console.log(this.state, "annee :" + this.props.year.id);
        this.setState({
            spinner: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-section-historique',
                idSpec: idSpec,
                annee: this.props.year.id
            }
        })
            .then(result => {
                this.setState({
                    listSection: result.data,
                    spinner: false
                });
                console.log(result.data);
                console.log(this.state);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getListeGroup = (idSection) => {
        const API_PATH = HOST + "/project/backend/ajax/faculty.php";
        this.setState({
            spinner: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-group-historique',
                idSection: idSection,
                annee: this.props.year.id
            }
        })
            .then(result => {
                this.setState({
                    listGroup: result.data,
                    spinner: false
                });
                console.log(result.data);
                console.log(this.state);
            })
            .catch(error => this.setState({ error: error.message }));

    };

    AddSection = () => {
        if (this.state.nomSection) {
            const API_PATH = HOST + "/project/backend/ajax/faculty.php";
            this.setState({
                spinner: true
            });
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'add-section',
                    nomSection: this.state.nomSection,
                    idSpec: this.state.idSpec,
                    annee: this.props.year.id
                }
            })
                .then(result => {

                    console.log(result.data);
                    if (result.data === "M_NotUnique") {
                        this.setState({
                            spinner: false,
                            error: 'notUnique',
                            nomSection: '',
                            alert: {
                                color: 'danger',
                                title: 'error',
                                subject: 'nom section not Unique',
                            }
                        });
                        this.funHidenAlert(3000);
                    }
                    if (result.data === false) {
                        this.setState({
                            spinner: false,
                            nomSection: '',
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
                            nomSection: '',
                            error: 'false',
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'Ajouté avec succès',
                            }
                        });
                        this.getListeSection(this.state.idSpec);
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));

        } else {
            this.setState({
                spinner: false,
                error: 'notPrintInput',
                nomSection: '',
                alert: {
                    color: 'danger',
                    title: 'error',
                    subject: 'Veuillez écrire un nom section',
                }
            });
            this.funHidenAlert(3000);
        }
    };

    AffectationSemestre2 = () => {
        let API_PATH = HOST + "/project/backend/ajax/historique.php";
        this.setState({
            spinner: true
        })
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'new-semestre2',
                idYear: this.props.year.id,
            }
        })
            .then(result => {
                this.setState({
                    spinner: false
                });
                if (result.data) {
                    this.props.syncYear({
                        id: this.props.year.id,
                        annee: this.props.year.annee,
                        semestre: '2',
                        statut: this.props.year.statut
                    });
                    this.setState({
                        semestre: '2',
                        error: 'Newsemestre2',
                        alert: {
                            color: 'success',
                            title: 'REMARQUE',
                            subject: 'Vous pouvez ajouter au groupe',
                        },
                    });
                    this.funHidenAlert(4500);
                } else {
                    this.setState({
                        error: 'NotNewsemestre2',
                        alert: {
                            color: 'danger',
                            title: 'REMARQUE',
                            subject: 'La semestre ne peut pas être ajoutée',
                        },
                    });
                    this.funHidenAlert(4500);
                }
            })
            .catch(error => this.setState({ error: error.message }));
    }

    AddGroup = () => {
        if (this.state.nomGroup) {
            const API_PATH = HOST + "/project/backend/ajax/faculty.php";
            this.setState({
                spinner: true
            });
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'add-group',
                    nomGroup: this.state.nomGroup,
                    idSection: this.state.idSection,
                    annee: this.props.year.id
                }
            })
                .then(result => {

                    console.log(result.data);
                    if (result.data === "M_NotUnique") {
                        this.setState({
                            spinner: false,
                            error: 'notUnique',
                            nomGroup: '',
                            alert: {
                                color: 'danger',
                                title: 'error',
                                subject: 'nom group not Unique',
                            }
                        });
                        this.funHidenAlert(3000);
                    }
                    if (result.data === false) {
                        this.setState({
                            spinner: false,
                            nomGroup: '',
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
                            nomGroup: '',
                            error: 'false',
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'Ajouté avec succès',
                            }
                        });
                        this.getListeGroup(this.state.idSection);
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));

        } else {
            this.setState({
                spinner: false,
                error: 'notPrintInput',
                nomSection: '',
                alert: {
                    color: 'danger',
                    title: 'error',
                    subject: 'Veuillez écrire un nom section',
                }
            });
            this.funHidenAlert(3000);
        }
    };

    modiferSection = () => {
        if (this.state.nomSection) {
            const API_PATH = HOST + "/project/backend/ajax/faculty.php";
            this.setState({
                spinner: true
            });
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'modifer-section',
                    idSection: this.state.idSection,
                    nomSection: this.state.nomSection,
                    idSpec: this.state.idSpec,
                    annee: this.props.year.id
                }
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data === "M_NotUnique") {
                        this.setState({
                            spinner: false,
                            error: 'notUnique',
                            nomSection: '',
                            alert: {
                                color: 'danger',
                                title: 'error',
                                subject: 'nom section not Unique',
                            }
                        });
                        this.funHidenAlert(3000);
                    }
                    if (result.data === false) {
                        this.setState({
                            spinner: false,
                            nomSection: '',
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
                            nomSection: '',
                            error: 'false',
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'modifer avec succès',
                            }
                        });
                        this.getListeSection(this.state.idSpec);
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));

        } else {
            this.setState({
                spinner: false,
                error: 'notPrintInput',
                nomSection: '',
                alert: {
                    color: 'danger',
                    title: 'error',
                    subject: 'Veuillez écrire un nom section',
                }
            });
            this.funHidenAlert(3000);
        }
    };

    modiferGroup = () => {
        if (this.state.nomGroup) {
            const API_PATH = HOST + "/project/backend/ajax/faculty.php";
            this.setState({
                spinner: true
            });
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: {
                    but: 'modifer-group',
                    idGroup: this.state.idGroup,
                    nomGroup: this.state.nomGroup,
                    idSection: this.state.idSection,
                    annee: this.props.year.id
                }
            })
                .then(result => {
                    console.log(result.data);
                    if (result.data === "M_NotUnique") {
                        this.setState({
                            spinner: false,
                            error: 'notUnique',
                            nomGroup: '',
                            alert: {
                                color: 'danger',
                                title: 'error',
                                subject: 'nom Group not Unique',
                            }
                        });
                        this.funHidenAlert(3000);
                    }
                    if (result.data === false) {
                        this.setState({
                            spinner: false,
                            nomGroup: '',
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
                            nomGroup: '',
                            error: 'false',
                            alert: {
                                color: 'success',
                                title: 'REMARQUE',
                                subject: 'modifer avec succès',
                            }
                        });
                        this.getListeGroup(this.state.idSection);
                        this.funHidenAlert(2000);
                    }
                })
                .catch(error => this.setState({ error: error.message }));

        } else {
            this.setState({
                spinner: false,
                error: 'notPrintInput',
                nomSection: '',
                alert: {
                    color: 'danger',
                    title: 'error',
                    subject: 'Veuillez écrire un nom section',
                }
            });
            this.funHidenAlert(3000);
        }
    };

    removeSection = (id) => {
        console.log(id);
        const API_PATH = HOST + "/project/backend/ajax/faculty.php";
        this.setState({
            spinner: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'remove-section',
                id: id,
            }
        })
            .then(result => {
                console.log(result.data);
                if (result.data === false) {
                    this.setState({
                        spinner: false,
                        nomSection: '',
                        error: 'error',
                        alert: {
                            color: 'danger',
                            title: 'error',
                            subject: 'Cet élément ne peut pas être supprimé',
                        }
                    });
                    this.funHidenAlert(4000);
                }
                if (result.data === true) {
                    this.setState({
                        spinner: false,
                        nomSection: '',
                        error: 'false',
                        alert: {
                            color: 'success',
                            title: 'REMARQUE',
                            subject: 'Suppression réussie',
                        }
                    });
                    this.getListeSection(this.state.idSpec);
                    this.funHidenAlert(2000);
                }
            })
            .catch(error => this.setState({ error: error.message }));


    };

    removeGroup = (id) => {
        console.log(id);
        const API_PATH = HOST + "/project/backend/ajax/faculty.php";
        this.setState({
            spinner: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'remove-group',
                id: id,
            }
        })
            .then(result => {
                console.log(result.data);
                if (result.data === false) {
                    this.setState({
                        spinner: false,
                        nomGroup: '',
                        error: 'error',
                        alert: {
                            color: 'danger',
                            title: 'error',
                            subject: 'Cet élément ne peut pas être supprimé',
                        }
                    });
                    this.funHidenAlert(4000);
                }
                if (result.data === true) {
                    this.setState({
                        spinner: false,
                        nomGroup: '',
                        error: 'false',
                        alert: {
                            color: 'success',
                            title: 'REMARQUE',
                            subject: 'Suppression réussie',
                        }
                    });
                    this.getListeGroup(this.state.idSection);
                    this.funHidenAlert(2000);
                }
            })
            .catch(error => this.setState({ error: error.message }));


    };



    // ----------------------------------------------- Component --------------------------------------

    FunComponentMain = () => {
        switch (this.state.compenet) {
            case 'specialite':
                return (
                    <div className="mt-4">
                        {this.funComponentListSpec()}
                    </div>
                );

            case 'section':
                return (this.funComponentSection());

            case 'group':
                return (this.funComponentGroup());

            case 'affectation':
                return (<Affectation idGroup={this.state.idGroup} year={this.props.year} semestre={this.state.semestre} />);


        }
    }

    funComponentSection = () => {
        return (
            <div className="mt-1">
                <div className="mb-4  text-right pt-3 pr-3">
                    {this.props.year.statut != '1' ? "" :
                        <button type="button" type="button" className="btn btn-outline-success py-2 mb-3" data-toggle="modal" data-target=".exampleModal"
                            onClick={() => this.funSwichModal({ modal: 'section', typeModal: 'ajouter', idSection: '', nomSection: '' })} >
                            <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                            Ajouter une section
                        </button>}
                </div>
                {
                    this.state.listSection.length != 0 && this.state.listSection != null
                        ?
                        this.funComponentListSection()
                        : <Fragment>
                            <div className="text-center text-red m-5 p-5">
                                il n'y a pas section
                            </div>
                        </Fragment>
                }
            </div>
        );
    }

    funComponentGroup = () => {
        return (
            <div className="mt-1">
                <div className="mb-4  text-right pt-3 pr-3">
                    {this.props.year.statut != '1' ? "" :
                        <button type="button" type="button" className="btn btn-outline-success py-2 mb-3" data-toggle="modal" data-target=".exampleModal"
                            onClick={() => this.funSwichModal({ modal: 'group', typeModal: 'ajouter', idGroup: '', nomGroup: '' })} >
                            <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                            Ajouter une group
                        </button>}
                </div>
                {
                    this.state.listGroup.length != 0 && this.state.listGroup != null
                        ?
                        this.funComponentListGroup()
                        : <Fragment>
                            <div className="text-center text-red m-5 p-5">
                                il n'y a pas group
                            </div>
                        </Fragment>
                }
            </div>
        );
    }

    funComponentModaleMain = () => {
        switch (this.state.modal) {
            case "section":
                return (this.funComponentModaleSection());
            case "group":
                return (this.funComponentModaleGroup());
            default:
                return ("");
        }
    }

    funComponentListSpec = () => {
        const ListSpec = this.state.listSpec.map(item => {
            return (
                <div className="w-100 list-h text-muted pl-2 py-3" key={item.id}
                    onClick={() => this.funClickSpec(item)}>
                    {item.nom_spec + "( " + item.annee + " ) "}
                </div>
            );
        });
        return ListSpec;
    }

    funComponentListSection = () => {
        const ListSection = this.state.listSection.map(item => {
            return (
                <div className="mx-2 list-h text-muted  row" key={item.id} >
                    <div className="list-h-span h3 text-muted  col-10 " onClick={() => this.funClickSection(item)}>  {item.nom_sec + " ( " + this.state.nomSpec + " )"}</div>
                    {this.props.year.statut != '1' ? "" :
                        <div className="col-2  text-right pt-2" >
                            <i className="fas fa-pencil-alt text-success mx-3" data-toggle="modal" data-target=".exampleModal"
                                onClick={() => this.funSwichModal({ modal: 'section', typeModal: 'modifer', idSection: item.id, nomSection: item.nom_sec })}></i>
                            <i className="fas fa-trash-alt text-danger " onClick={() => this.removeSection(item.id)}></i>

                        </div>}
                </div>
            );
        });
        return ListSection;
    }

    funComponentListGroup = () => {
        const listGroup = this.state.listGroup.map(item => {
            return (
                <div className="mx-2 list-h text-muted  row" key={item.id} >
                    <div className="list-h-span h3 text-muted  col-10 " onClick={() => this.funClickGroup(item)}>  {this.state.nomSection + "/" + item.nom_grp + " ( " + this.state.nomSpec + " )"}</div>
                    {this.props.year.statut != '1' ? "" :
                        <div className="col-2  text-right pt-2" >
                            <i className="fas fa-pencil-alt text-success mx-3" data-toggle="modal" data-target=".exampleModal"
                                onClick={() => this.funSwichModal({ modal: 'group', typeModal: 'modifer', idGroup: item.id, nomGroup: item.nom_grp })}></i>
                            <i className="fas fa-trash-alt text-danger " onClick={() => this.removeGroup(item.id)}></i>
                        </div>}
                </div>
            );
        });
        return listGroup;
    }


    render() {
        return (
            this.state.spinner
                ? <Spinner />
                : <Fragment>
                    <div className="my-3  ">
                        <span className="float-left btn mr-5" onClick={() => this.props.funPushPageHome()} >
                            <i className="fas fa-arrow-left  text-muted mt-2 "></i>
                        </span>
                        <span className={"h3 " + (this.props.year.statut != 1 ? "text-muted" : "text-success")}>
                            {this.props.year.annee}
                        </span>
                    </div>
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <a className={"nav-link " + (this.state.semestre === "1" ? "text-success" : "text-muted")}
                                onClick={() => this.funChangeSemestre1()}>semestre 1</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link " + (this.state.semestre === "2" ? "text-success" : "text-muted")}
                                onClick={() => this.funChangeSemestre2()} >semestre 2</a>
                        </li>
                    </ul>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            {/* specialite */}
                            <li className="breadcrumb-item text-info cursor"
                                onClick={() => this.funChangeNavBar(
                                    {
                                        idSpec: '',
                                        compenet: 'specialite'
                                    })}>Specialite</li>



                            {/* section */}
                            {
                                this.state.compenet === 'section' ||
                                    this.state.compenet === 'group' ||
                                    this.state.compenet === 'affectation'
                                    ?
                                    <li className="breadcrumb-item text-info cursor"
                                        onClick={() => this.funChangeNavBar(
                                            {
                                                idSection: '',
                                                compenet: 'section'
                                            })}>Section</li>
                                    :
                                    ''
                            }

                            {/* group */}
                            {
                                this.state.compenet === 'group' ||
                                    this.state.compenet === 'affectation'
                                    ?
                                    <li className="breadcrumb-item text-info cursor"
                                        onClick={() => this.funClickNavGroup()}>group</li>
                                    :
                                    ''
                            }
                            {/* Affectation */}
                            {
                                this.state.compenet === 'affectation'
                                    ?
                                    <li className="breadcrumb-item text-info cursor"
                                        onClick={() => this.funChangeNavBar(
                                            {
                                                compenet: 'affectation'
                                            })}>Affectation</li>
                                    :
                                    ''
                            }
                        </ol>
                    </nav>
                    {(this.state.error === null) ? "" : <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} />}
                    {this.FunComponentMain()}

                    {/* modal */}
                    {this.funComponentModaleMain()}

                </Fragment>
        );
    }

    // -------------------------------- finction -----------------------------------------

    funClickSpec = (spec) => {
        this.setState({
            idSpec: spec.id,
            nomSpec: spec.nom_spec,
            compenet: 'section'
        });
        this.getListeSection(spec.id);
    }

    funClickSection = (section) => {
        this.setState({
            idSection: section.id,
            nomSection: section.nom_sec,
            compenet: 'group',
            modal: '',
            typeModal: '',
        });
        this.getListeGroup(section.id);
    }

    funClickGroup = (group) => {
        this.setState({
            idGroup: group.id,
            nomGroup: group.nom_grp,
            compenet: 'affectation',
            modal: '',
            typeModal: '',
        });
        this.getListeGroup(group.id);
    }

    funClickNavGroup = () => {
        this.funChangeNavBar(
            {
                idGroup: '',
                compenet: 'group'
            })
        this.getListeGroup(this.state.idSection);
    }

    funChangeNavBar = (objSetState) => {
        this.setState(objSetState);
        console.log(this.state);
    }

    funSwichModal = (objSetState) => {
        this.setState(objSetState);
    }

    funChangeNomSection = (e) => {
        this.setState({
            nomSection: e.target.value
        });
        console.log(e.target.value);
    }

    funChangeNomGroup = (e) => {
        this.setState({
            nomGroup: e.target.value
        });
        console.log(e.target.value);
    }

    funChangeSemestre1 = () => {
        this.setState({
            semestre: '1'
        });
    }

    funChangeSemestre2 = () => {
        if (this.props.year.semestre === "2") {
            this.setState({
                semestre: '2'
            });
        } else {
            // send bd
            if (this.props.year.statut === '1') this.AffectationSemestre2();
        }

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

    // -------------------------------- Modal -----------------------------------------
    funComponentModaleSection = () => {
        return (
            <div className="modal fade exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {(this.state.typeModal != 'modifer' ? 'ajouter' : 'modifer') + ' un section'}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name1" className="col-form-label">nom section:</label>
                                    <input type="text" className="form-control" id="recipient-name1"
                                        onChange={this.funChangeNomSection} value={this.state.nomSection} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name2" className="col-form-label">Nom specialite:</label>
                                    <input type="text" className="form-control" id="recipient-name2"
                                        value={this.state.nomSpec} disabled />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name2" className="col-form-label">Annee:</label>
                                    <input type="text" className="form-control" id="recipient-name2"
                                        value={this.props.year.annee} disabled />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="exitModam" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                            {this.state.typeModal != 'modifer'
                                ? <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.AddSection} >Ajouter</button>
                                : <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.modiferSection} >modifer</button>

                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    funComponentModaleGroup = () => {
        return (
            <div className="modal fade exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {(this.state.typeModal != 'modifer' ? 'ajouter' : 'modifer') + ' un group'}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name1" className="col-form-label">nom group:</label>
                                    <input type="text" className="form-control" id="recipient-name1"
                                        onChange={this.funChangeNomGroup} value={this.state.nomGroup} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name2" className="col-form-label">Nom section:</label>
                                    <input type="text" className="form-control" id="recipient-name2"
                                        value={this.state.nomSection} disabled />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name2" className="col-form-label">Nom specialite:</label>
                                    <input type="text" className="form-control" id="recipient-name2"
                                        value={this.state.nomSpec} disabled />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name2" className="col-form-label">Annee:</label>
                                    <input type="text" className="form-control" id="recipient-name2"
                                        value={this.props.year.annee} disabled />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="exitModam" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                            {this.state.typeModal != 'modifer'
                                ? <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.AddGroup} >Ajouter</button>
                                : <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.modiferGroup} >modifer</button>

                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }



}

export default Historique;