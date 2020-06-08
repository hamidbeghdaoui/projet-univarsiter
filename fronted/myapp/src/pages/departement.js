import React, { Component, Fragment } from 'react';
import axios from "axios";
import Spinner from "./../helpers/spinner";
import Alert from "./../helpers/alert";
import Historique from "./../components/historique";
import HOST from "./../helpers/host";

class Departement extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        pageCompenet: "home",
        spinnerGetListAnnee: true,
        year: {},
        error: null,
        alert: {
            color: 'warning',
            title: 'REMARQUE',
            subject: "'Il n'est pas possible d'ajouter un an pour le moment'",
        },
        listAnnee: []
    }

    //---------------------------------------------When the page loads----------------------------------------
    componentDidMount() {
        this.getAllAnnee();
    }

    //---------------------------------------------contact server----------------------------------------
    getAllAnnee = () => {
        let API_PATH = HOST + "/project/backend/ajax/historique.php";
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'get-all-annee',
            }
        })
            .then(result => {
                console.log(result.data);
                this.setState({
                    spinnerGetListAnnee: false,
                    listAnnee: result.data.reverse()

                });
            })
            .catch(error => this.setState({ error: error.message }));

    };

    newYear = () => {
        let API_PATH = HOST + "/project/backend/ajax/historique.php";
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'new-year',
            }
        })
            .then(result => {
                console.log(result.data);
                if (result.data) {
                    this.getAllAnnee();
                } else {
                    this.setState({
                        error: 'NotNewAnnee'
                    });
                    this.funHidenAlert(4500);
                }
            })
            .catch(error => this.setState({ error: error.message }));

    };
    // ----------------------------------------------- Component --------------------------------------
    FunComponentHome = () => {
        return (
            <div>
                {(this.state.error === null) ? "" : <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} />}
                <div className="m-5 p-5 row justify-content-center">
                    <div className="col-lg-4 my-2">
                        <button type="button"
                            className="btn py-4 w-100 btn-success" onClick={() => this.newYear()}>
                            <i className="fas fa-1x fa-plus ml-1 mr-3"></i>
                         Nouvel An
                    </button>
                    </div>
                    {this.state.listAnnee.length != 0 && this.state.listAnnee.length != null
                        ?
                        this.FunComponentAnnee()
                        :
                        <Fragment>
                            <div className="text-center text-muted m-5 p-5">
                                Placer etudiants dans leurs groups
                        </div>
                        </Fragment>
                    }
                </div>
            </div>
        );
    }

    FunComponentAnnee = () => {
        const itemListAnnee = this.state.listAnnee.map(item => {
            return (
                <div className="col-lg-4 my-2" key={Math.floor(Math.random() * 1000)}>
                    <button type="button"
                        className={"btn py-4 w-100 " + (item.statut != '1' ? "btn-outline-dark" : "btn-info")}
                        onClick={() => this.funPushPageHistorique(item)}>
                        <i className="fas fa-history ml-1 mr-3 "></i>
                        {item.annee}
                    </button>
                </div>
            );
        });
        return itemListAnnee;
    }

    // -------------------------------------------- render ------------------------------------------
    render() {
        switch (this.state.pageCompenet) {
            case "home":
                return (this.spinnerGetListAnnee ? <Spinner /> : this.FunComponentHome());
            case "historique":
                return (<Historique year={this.state.year} funPushPageHome={() => this.funPushPageHome()} syncYear={this.syncYear} />);
        }

    }

    funPushPageHistorique = (year) => {
        this.setState({
            pageCompenet: 'historique',
            year: year
        });
        console.log(year);
    }

    syncYear = (year) => {
        this.setState({
            year: year
        });
    }

    funPushPageHome = () => {
        this.getAllAnnee();
        this.setState({
            pageCompenet: 'home',
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // -------------------------------- Alert -----------------------------------------
    funHidenAlert = async (time) => {
        await this.sleep(time);
        this.setState({
            error: null,
        });
    }


}

export default Departement;
