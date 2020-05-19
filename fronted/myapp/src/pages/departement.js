import React, { Component, Fragment } from 'react';
import Publication from "./../components/publication";
import axios from "axios";
import Spinner from "./../helpers/spinner";

class Departement extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        pageCompenet: "home",
        error: null,
        alert: {
            color: 'warning',
            title: 'REMARQUE',
            subject: 'Ce type de fichier ne peut pas être envoyé',
        },
        listPub: []
    }

    //---------------------------------------------When the page loads----------------------------------------
    componentDidMount() { }

    //---------------------------------------------contact server----------------------------------------
    getPub = () => {
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        let API_PATH = "http://127.0.0.1/project/backend/ajax/etudiant.php";
        console.log(sessionUser);
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-pub',
                id_typeUser: sessionUser.id_typeUser
            }
        })
            .then(result => {
                console.log(result.data);
                this.setState({
                    component: "publication",
                    listPub: result.data

                });
            })
            .catch(error => this.setState({ error: error.message }));

    };
    // ----------------------------------------------- Component --------------------------------------
    FunComponentHome = () => {
        return (
            <div className="m-5 p-5 row justify-content-center">

                <div className="col-lg-4 my-2">
                    <button type="button" className="btn btn-info py-4 w-100">
                        <i className="fas fa-history ml-1 mr-3 "></i>
                    2019 / 2020
                        </button>
                </div>
                <div className="col-lg-4 my-2">
                    <button type="button" className="btn btn-outline-dark py-4 w-100">
                        <i className="fas fa-history ml-1 mr-3 "></i>
                    2018 / 2019
                        </button>
                </div>
                <div className="col-lg-4 my-2">
                    <button type="button" className="btn btn-outline-dark py-4 w-100">
                        <i className="fas fa-history ml-1 mr-3 "></i>
                    2017 / 2018
                        </button>
                </div>
                <div className="col-lg-4 my-2">
                    <button type="button" className="btn btn-outline-dark py-4 w-100">
                        <i className="fas fa-history ml-1 mr-3 "></i>
                    2016 / 2017
                        </button>
                </div>
                <div className="col-lg-4 my-2">
                    <button type="button" className="btn btn-outline-dark py-4 w-100">
                        <i className="fas fa-history ml-1 mr-3 "></i>
                    2015 / 2016
                        </button>
                </div>

            </div>
        );
    }

    FunComponent = () => {
        return (
            this.state.listPub.length === 0 ?
                <div className="text-center m-5 p-5">
                    Il n'y a aucun publication à afficher
        </div>
                :
                <Publication getPub={this.getPub} pubEnreg={false} listPub={this.state.listPub} />
        );
    }

    // -------------------------------------------- render ------------------------------------------
    render() {
        return (
            this.FunComponentHome()
        );
    }





}

export default Departement;
