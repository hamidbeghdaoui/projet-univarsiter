import React, { Component, Fragment } from 'react';
import Ajouter_E from "./../components/ajouter_E";
import Ajouter_P from "./../components/ajouter_P";
import Ajouter_A from "./../components/ajouter_A";
import Ajouter_S from "./../components/ajouter_S";
import axios from "axios";

class AccueilAdmin extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        pageCompenet: "ajouter_S",
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
                    <button type="button" className="btn btn-outline-info py-4 w-100" 
                    onClick={() => this.funChangePage('ajouter_E')}>
                        <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                    Ajouter des étudiants
                        </button>
                </div>
                <div className="col-lg-4 my-2">
                    <button type="button" className="btn btn-outline-info py-4 w-100" 
                    onClick={() => this.funChangePage('ajouter_P')}>
                        <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                    Ajouter des prof
                        </button>
                </div>
                <div className="col-lg-4 my-2">
                    <button type="button" className="btn btn-outline-info py-4 w-100" 
                    onClick={() => this.funChangePage('ajouter_A')}>
                        <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                    Ajouter des admin
                        </button>
                </div>
                <div className="col-lg-4 my-2">
                    <button type="button" className="btn btn-outline-info py-4 w-100" 
                    onClick={() => this.funChangePage('ajouter_S')}>
                        <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                    Ajouter des specialité
                        </button>
                </div>
                <div className="col-lg-4 my-2">
                    <button type="button" className="btn btn-outline-info py-4 w-100" 
                    onClick={() => this.funChangePage('ajouter_M')}>
                        <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                    Ajouter des module
                        </button>
                </div>

            </div>
        );
    }

  

    // -------------------------------------------- render ------------------------------------------
    render() {
        switch (this.state.pageCompenet) {
            case 'home':
                return (
                    this.FunComponentHome()
                );
            case 'ajouter_E':
                return (
                    <Ajouter_E funChangePage ={this.funChangePage} />
                );
            case 'ajouter_P':
                return (
                    <Ajouter_P funChangePage ={this.funChangePage} />
                );
            case 'ajouter_A':
                return (
                    <Ajouter_A funChangePage ={this.funChangePage} />
                );
            case 'ajouter_S':
                return (
                    <Ajouter_S funChangePage ={this.funChangePage} />
                );
        
        }
       
    }

    // -------------------------------------------- function ------------------------------------------
    funChangePage = (page) => {
        this.setState({
            pageCompenet: page
        });

    }




}

export default AccueilAdmin;
