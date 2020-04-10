import React, { Fragment, Component } from 'react';
import ItemListeProf from "./../components/itemListeProf";
import Publication from "./../components/publication";
import ItemListeResultCher from "../components/itemListeResultCher";
import Spinner from "./../helpers/spinner";
import Message from "./../pages/message";

import axios from "axios";


class L_Administration extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        component: "spinner",
        listAdmin: [],
        listPub: [],
        infoAdminPub: null,
        itemMessage: null
    }

    //---------------------------------------------When the page loads----------------------------------------
    componentDidMount() {
        this.getMyAdmin();
    }

    //---------------------------------------------contact server----------------------------------------
    getMyAdmin = () => {
        const API_PATH = "http://127.0.0.1/project/backend/ajax/etudiant.php";
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        // console.log(sessionUser);
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-all-admin',
            }
        })
            .then(result => {
                console.log(result.data);
                this.setState({
                    component: "admin",
                    listAdmin: result.data

                });
            })
            .catch(error => this.setState({ error: error.message }));

    };



    getMyAdminPub = (idUser, id_typeUser, typeUser) => {
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

    ItemListeAdmin = () => {

       const itemListe = this.state.listAdmin.map(item => {
            return (
                <div className="card text-white bg-danger mb-3" key={item.idUser}>
                    <div className="card-header">
                        <div className="w-100">
                            <div className="">
                                <div className="float-left ">
                                    {
                                        item.image != null
                                            ?
                                            <div>
                                                <img className="rounded-circle mr-1" src={"http://127.0.0.1/project/backend/file/user/" + item.image} width="60"
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
                                <div className="float-right mt-3 mr-2 small">{"admin (" + item.role + ") "}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <a className="btn btn-dark mt-1 mx-1 text-light size-1" onClick={() => this.funpushPageChate(item)}>
                                Envoyer un message
                           </a>

                            <a className="btn btn-dark mt-1 mx-1 text-light size-1"
                                onClick={() => this.funSetInfoProfPub(item)}>
                                Les publications
                           </a>
                        </div>
                    </div>
                </div>
            );
        });
        return itemListe;

    }

    FunComponentMain = () => {
        return (

            <Fragment>

                <div className="w-100 my-5 ">
                    <h2 className="text-muted text-center ml-3">L'administration :</h2>
                </div>
                {
                    this.state.listAdmin.length === 0 ?
                        <Fragment>
                            <div className="text-center m-5 p-5 text-muted">
                                Il n'y a aucun admin à afficher
                    </div>
                        </Fragment>
                        : this.ItemListeAdmin()
                }
            </Fragment>
        );
    }

    FunComponentPub = () => {
        const { infoAdminPub } = this.state;
        return (
            <Fragment>
                <div className="card text-white bg-danger mb-3">
                    <div className="card-header">
                        <div className="w-100">
                            <div className="">
                                <span className="float-left btn" onClick={() => this.funReturnPageAdmin()} >
                                    <i className="fas fa-arrow-left fa-2x text-light mt-2 "></i>
                                </span>
                                <div className="float-left ">
                                    {
                                        infoAdminPub.image != null
                                            ?
                                            <div>
                                                <img className="rounded-circle mr-1" src={"http://127.0.0.1/project/backend/file/user/" + infoAdminPub.image} width="60"
                                                    height="60" />
                                                <span className=" small ">{infoAdminPub.nom + " " + infoAdminPub.prenom}</span>

                                            </div>
                                            :
                                            <div className="row pl-2">
                                                <div className=" ImageUser pt-2 h1 bg-light mx-1">
                                                    {infoAdminPub.prenom.charAt(0).toUpperCase()}
                                                </div>
                                                <span className=" col small text-left pt-3 pl-0  ">{infoAdminPub.nom + " " + infoAdminPub.prenom}</span>
                                            </div>
                                    }

                                </div>
                                <div className="float-right mt-3 mr-2 small">{"admin (" + infoAdminPub.role + ") " }</div>
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
            <Message FunNavChangeBoolChate={this.funReturnPageAdmin} itemMessage={this.state.itemMessage}
            />
        );
    }

    // -------------------------------------------- render ------------------------------------------
    render() {
        switch (this.state.component) {
            case "admin":
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
        }

    }
    // -------------------------------------------- function ------------------------------------------
    funSetInfoProfPub = (info) => {
        this.setState({
            infoAdminPub: info,
            component: "pub"
        });
        this.getMyAdminPub(info.idUser, info.id_typeUser, info.typeUser);
        console.log(info);
    }

    funReturnPageAdmin = () => {
        this.setState({
            listPub: [],
            infoAdminPub: null,
            component: "admin",
        });
    }


    funpushPageChate = (item) => {
        this.setState({
            itemMessage: item,
            component: "chate"
        });
        console.log(item);

    }




}

export default L_Administration;




