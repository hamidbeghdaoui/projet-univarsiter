import React, { Fragment, Component } from 'react';
import Publication from "./publication";
import Spinner from "./../helpers/spinner";
import Message from "./../pages/message";
import axios from "axios";
import HOST from "./../helpers/host";


class EtudiantForEtudiant extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        component: "spinner",
        listEtudiant: [],
        listPub: [],
        infoEtudiantPub: null,
        itemMessage: null,
        resultRech: [],
        spinnerCher: false,
        inputcher: '',
    }

    //---------------------------------------------When the page loads----------------------------------------
    componentDidMount() {
        this.getMyEtudiant();
    }

    //---------------------------------------------contact server----------------------------------------
    getMyEtudiant = () => {
        const API_PATH =  HOST + "/project/backend/ajax/etudiant.php";
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        console.log(sessionUser);
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-all-myEtudiant',
                id_etudiant: sessionUser.id_typeUser,
            }
        })
            .then(result => {
                console.log(result.data);
                this.setState({
                    component: "etudiant",
                    listEtudiant: result.data

                });
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getResaultCher = (moteDeCHer) => {
        const API_PATH =  HOST + "/project/backend/ajax/etudiant.php";
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        // console.log(sessionUser);
        this.setState({
            spinnerCher: true
        });
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'cher-Etudiant',
                moteDeCHer: moteDeCHer,
                id_etudiant: sessionUser.id_typeUser,
            }
        })
            .then(result => {
                console.log(result.data);
                this.setState({
                    resultRech: result.data,
                    spinnerCher: false
                });
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getMyEtudiantPub = (idUser, id_typeUser, typeUser) => {
        const API_PATH =  HOST + "/project/backend/ajax/etudiant.php";
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        // console.log(sessionUser);
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-all-pub-myUser',
                idUser: idUser,
                id_typeUser: id_typeUser,
                typeUser: typeUser,
                id_etudiant: sessionUser.id_typeUser
            }
        })
            .then(result => {
                this.setState({
                    listPub: result.data
                });
                console.log(result.data);
            })
            .catch(error => this.setState({ error: error.message }));

    };
    // ----------------------------------------------- Component --------------------------------------

    ItemListeEtudiant = () => {

        const itemListe = this.state.listEtudiant.map(item => {
            return (
                <div className="card text-white bg-dark mb-3" key={item.idUser}>
                    <div className="card-header">
                        <div className="w-100">
                            <div className="">
                                <div className="float-left ">
                                    {
                                        item.image != null
                                            ?
                                            <div>
                                                <img className="rounded-circle mr-1" src={ HOST + "/project/backend/file/user/" + item.image} width="60"
                                                    height="60" />
                                                <span className=" small ">{item.nom + " " + item.prenom}</span>

                                            </div>
                                            :
                                            <div className="row pl-2">
                                                <div className=" ImageUser pt-2 h1 bg-light mx-1">
                                                    {item.prenom.charAt(0).toUpperCase()}
                                                </div>
                                                <span className=" col small text-left pt-3 pl-0  ">{item.nom + " " + item.prenom}</span>
                                            </div>
                                    }

                                </div>
                                <div className="float-right mt-3 mr-2 small">{"etudiant (" + item.annee + " " + item.nom_spec + "): " + item.nom_sec + " / " + item.nom_grp}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <a className="btn btn-info mt-1 mx-1 text-light size-1" onClick={() => this.funpushPageChate(item)}>
                                Envoyer un message
                           </a>

                            <a className="btn btn-info mt-1 mx-1 text-light size-1"
                                onClick={() => this.funSetInfoEtudiantPub(item)}>
                                Les publications
                           </a>
                        </div>
                    </div>
                </div>
            );
        });
        return itemListe;

    }

    ItemListeResultCher = () => {
        const { resultRech } = this.state;
        const Liste = resultRech.map(item => {
            return (
                <div className="card text-white bg-dark mb-3" key={item.idUser}>
                    <div className="card-header">
                        <div className="w-100">
                            <div className="">
                                <div className="float-left ">
                                    {
                                        item.image != null
                                            ?
                                            <div>
                                                <img className="rounded-circle mr-1" src={ HOST + "/project/backend/file/user/" + item.image} width="60"
                                                    height="60" />
                                                <span className=" small ">{item.nom + " " + item.prenom}</span>

                                            </div>
                                            :
                                            <div className="row pl-2">
                                                <div className=" ImageUser pt-2 h1 bg-light mx-1">
                                                    {item.prenom.charAt(0).toUpperCase()}
                                                </div>
                                                <span className=" col small text-left pt-3 pl-0  ">{item.nom + " " + item.prenom}</span>
                                            </div>
                                    }

                                </div>
                                <div className="float-right mt-3 mr-2 small">{"etudiant (" + item.annee + " " + item.nom_spec + "): " + item.nom_sec + " / " + item.nom_grp}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <a className="btn btn-info mt-1 mx-1 text-light size-1" onClick={() => this.funpushPageChate(item)}>
                                Envoyer un message
                       </a>

                            <a className="btn btn-info mt-1 mx-1 text-light size-1"
                                onClick={() => this.funSetInfoEtudiantPub(item)}>
                                Les publications
                       </a>
                        </div>
                    </div>
                </div>
            );
        });

        return Liste;

    }

    FunComponentCher = () => {
        return (
            <Fragment>
                <div className="input-group mb-3">

                    <i className="fas fa-arrow-left fa-2x text-dark mr-4 mt-1" onClick={() => this.funReturnPageEtudiant()}></i>

                    <input type="text" className="form-control" placeholder="Rechercher un (prenom)etudiant"
                        aria-label="Rechercher un enseignant" aria-describedby="button-addon2"
                        onChange={this.funchangeInputCherch} value={this.state.inputcher} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Rechercher</button>
                    </div>
                </div>
                <h2 className="text-muted text-center my-5">Result Rechercher :</h2>
                {
                    this.state.spinnerCher ? <Spinner /> : this.ItemListeResultCher()
                }

            </Fragment>
        );
    }

    FunComponentMain = () => {
        return (

            <Fragment>

                <div className="w-100 my-5 row">
                    <h2 className="text-muted  col-6 text-left ml-3">Mon Groupe :</h2>
                    <button className="btn border-secondary ml-auto" type="button" onClick={this.funReturnPageCherch} >Rechercher un etudiant</button>
                </div>
                {
                    this.state.listEtudiant.length === 0 ?
                        <Fragment>
                            <div className="text-center m-5 p-5 text-muted">
                                Il n'y a aucun etudiant à afficher
                    </div>
                        </Fragment>
                        : this.ItemListeEtudiant()
                }
            </Fragment>
        );
    }

    FunComponentPub = () => {
        const { infoEtudiantPub } = this.state;
        return (
            <Fragment>
                <div className="card text-white bg-dark mb-3">
                    <div className="card-header">
                        <div className="w-100">
                            <div className="">
                                <span className="float-left btn" onClick={() => this.funReturnPageEtudiant()} >
                                    <i className="fas fa-arrow-left fa-2x text-light mt-2 "></i>
                                </span>
                                <div className="float-left ">
                                    {
                                        infoEtudiantPub.image != null
                                            ?
                                            <div>
                                                <img className="rounded-circle mr-1" src={ HOST + "/project/backend/file/user/" + infoEtudiantPub.image} width="60"
                                                    height="60" />
                                                <span className=" small ">{infoEtudiantPub.nom + " " + infoEtudiantPub.prenom}</span>

                                            </div>
                                            :
                                            <div className="row pl-2">
                                                <div className=" ImageUser pt-2 h1 bg-light mx-1">
                                                    {infoEtudiantPub.prenom.charAt(0).toUpperCase()}
                                                </div>
                                                <span className=" col small text-left pt-3 pl-0  ">{infoEtudiantPub.nom + " " + infoEtudiantPub.prenom}</span>
                                            </div>
                                    }

                                </div>
                                <div className="float-right mt-3 mr-2 small">{"etudiant (" + infoEtudiantPub.annee + " " + infoEtudiantPub.nom_spec + "): " + infoEtudiantPub.nom_sec + " / " + infoEtudiantPub.nom_grp}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.listPub.length === 0 ?
                    <div className="text-center m-5 p-5">
                        Il n'y a aucun publication à afficher
                         </div>
                    : <Publication pubEnreg={false} listPub={this.state.listPub} />}
            </Fragment>
        );
    }

    chate = () => {
        return (
            <Message FunNavChangeBoolChate={this.funReturnPageEtudiant} itemMessage={this.state.itemMessage}
            />
        );
    }

    // -------------------------------------------- render ------------------------------------------
    render() {
        switch (this.state.component) {
            case "etudiant":
                return (
                    <Fragment>
                        {this.FunComponentMain()}
                    </Fragment>
                );

            case "spinner":
                return (
                    <Spinner />
                );

            case "pub":
                return (
                    <Fragment>
                        {this.FunComponentPub()}
                    </Fragment>
                );

            case "chate":
                return (
                    <Fragment>
                        {this.chate()}
                    </Fragment>
                );

            case "cher":
                return (
                    <Fragment>
                        {this.FunComponentCher()}
                    </Fragment>
                );
        }

    }
    // -------------------------------------------- function ------------------------------------------
    funSetInfoEtudiantPub = (info) => {
        this.setState({
            infoEtudiantPub: info,
            component: "pub"
        });
        this.getMyEtudiantPub(info.idUser, info.id_typeUser, info.typeUser);
        console.log(info);
    }

    funReturnPageEtudiant = () => {
        this.setState({
            listPub: [],
            infoEtudiantPub: null,
            component: "etudiant",
            resultRech: [],
            inputcher: '',
        });
    }

    funReturnPageCherch = () => {
        this.setState({
            component: "cher"
        });

    }


    funpushPageChate = (item) => {
        this.setState({
            itemMessage: item,
            component: "chate"
        });
        console.log(item);

    }

    funchangeInputCherch = (e) => {
        this.setState({
            inputcher: e.target.value.trim()
        });
        if (e.target.value.trim()) {
            this.getResaultCher(e.target.value.trim());
        } else {
            this.setState({
                resultRech: [],
            });
        }

    }




}

export default EtudiantForEtudiant;




