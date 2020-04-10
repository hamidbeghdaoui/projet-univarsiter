import React, { Fragment, Component } from 'react';
import ItemListeProf from "./itemListeProf";
import Publication from "./publication";
import ItemListeResultCher from "./itemListeResultCher";
import Spinner from "./../helpers/spinner";
import Message from "./../pages/message";

import axios from "axios";


class ProfForProf extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        component: "spinner",
        listProf: [],
        rech: false,
        listPub: [],
        infoProfPub: null,
        resultRech: [],
        spinnerCher: false,
        inputcher: '',
        itemMessage: null
    }

    //---------------------------------------------When the page loads----------------------------------------
    componentDidMount() {
        this.getMyProf();
    }

    //---------------------------------------------contact server----------------------------------------
    getMyProf = () => {
        const API_PATH = "http://127.0.0.1/project/backend/ajax/prof.php";
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        // console.log(sessionUser);
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-all-prof',
                id_typeUser: sessionUser.id_typeUser
            }
        })
            .then(result => {
                console.log(result.data);
                this.setState({
                    component: "prof",
                    listProf: result.data

                });
            })
            .catch(error => this.setState({ error: error.message }));

    };

    getResaultCher = (moteDeCHer) => {
        const API_PATH = "http://127.0.0.1/project/backend/ajax/prof.php";
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
                but: 'cher-prof',
                moteDeCHer: moteDeCHer,
                id_typeUser: sessionUser.id_typeUser
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


    // ----------------------------------------------- Component --------------------------------------
    FunComponentMain = () => {
        return (

            <Fragment>

                <div className="w-100 my-5 row">
                    <h2 className="text-muted  col-6 text-left ml-3">Tous le Prof :</h2>
                    <button className="btn border-secondary ml-auto" type="button" onClick={this.funReturnPageCherch} >Rechercher un prof</button>
                </div>
                {
                    this.state.listProf.length === 0 ?
                        <Fragment>
                            <div className="text-center m-5 p-5 text-muted">
                                Il n'y a aucun prof à afficher
                    </div>
                        </Fragment>
                        : <ItemListeProf funpushPageChate={this.funpushPageChate} funSetInfoProfPub={this.funSetInfoProfPub} rech={this.state.rech} listProf={this.state.listProf} />
                }
            </Fragment>
        );
    }

    FunComponentCher = () => {
        return (
            <Fragment>
                <div className="input-group mb-3">

                    <i className="fas fa-arrow-left fa-2x text-dark mr-4 mt-1" onClick={() => this.funReturnPageProf()}></i>

                    <input type="text" className="form-control" placeholder="Rechercher un (prenom)prof"
                        aria-label="Rechercher un enseignant" aria-describedby="button-addon2"
                        onChange={this.funchangeInputCherch} value={this.state.inputcher} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Rechercher</button>
                    </div>
                </div>
                <h2 className="text-muted text-center my-5">Result Rechercher :</h2>
                {
                    this.state.spinnerCher ? <Spinner /> : <ItemListeResultCher  funpushPageChate={this.funpushPageChate} resultRech={this.state.resultRech} />
                }

            </Fragment>
        );
    }

    chate = () => {
        return (
            <Message  FunNavChangeBoolChate={this.funReturnPageProf} itemMessage={this.state.itemMessage}
                 />
        );
    }

    // -------------------------------------------- render ------------------------------------------
    render() {
        switch (this.state.component) {
            case "prof":
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

            case "cher":
                return (
                    <Fragment>
                        {this.FunComponentCher()}
                    </Fragment>
                );
            case "chate":
                return (
                    <Fragment>
                        {this.chate()}
                    </Fragment>
                );
        }

    }
    // -------------------------------------------- function ------------------------------------------
    funSetInfoProfPub = (info) => {
        this.setState({
            infoProfPub: info,
            component: "pub"
        });
        this.getMyProfPub(info.idUser, info.id_typeUser, info.typeUser);
        console.log(info);
    }

    funReturnPageProf = () => {
        this.setState({
            listPub: [],
            infoProfPub: null,
            component: "prof",
            resultRech: [],
            inputcher: ''
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

export default ProfForProf;