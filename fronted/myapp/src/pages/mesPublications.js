import React, { Fragment, Component } from 'react';
import Publication from "../components/publication";
import axios from "axios";
import Spinner from "./../helpers/spinner";
import HOST from "./../helpers/host";

class MesPublications extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        component: "spinner",
        targetGroup: 'etudiant',
        error: null,
        alert: {
            color: 'warning',
            title: 'REMARQUE',
            subject: 'Ce type de fichier ne peut pas être envoyé',
        },
        listPub: []
    }

    //---------------------------------------------When the page loads----------------------------------------
    componentDidMount() {
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        if (sessionUser.typeUser === "admin") {
            this.getPub('etudiant');
        } else {
            this.getPub(null);
        }

    }

    //---------------------------------------------contact server----------------------------------------
    getPub = (val) => {
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        let API_PATH = "";
        let sendData = {
            but: 'get-my-pub',
            id_typeUser: sessionUser.id_typeUser,
            id_User: sessionUser.id
        };
        switch (sessionUser.typeUser) {
            case "etudiant":
                API_PATH = HOST + "/project/backend/ajax/etudiant.php";
                break;
            case "prof":
                API_PATH = HOST + "/project/backend/ajax/prof.php";
                break;
            case "admin":
                API_PATH = HOST + "/project/backend/ajax/admin.php";
                sendData = {
                    but: 'get-my-pub',
                    id_typeUser: sessionUser.id_typeUser,
                    id_User: sessionUser.id,
                    targetGroup: val
                };
                break;
        }
        console.log(sessionUser);
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: sendData
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
    FunComponentPofEtEtudiant = () => {
        return (
            this.state.listPub.length === 0 ?
                <div className="text-center m-5 p-5">
                    Il n'y a aucun publication à afficher
        </div>
                : <Fragment >
                    {JSON.parse(localStorage.getItem('user') || null).typeUser === 'prof' ?
                        <Publication getPub={this.getPub} pubEnreg={false} listPub={this.state.listPub} hedenBtnEnr={true} />
                        :
                        <Publication getPub={this.getPub} pubEnreg={false} listPub={this.state.listPub} />
                    }
                </Fragment>
        );
    }

    FunComponentAdmin = () => {
        return (
            <Fragment>
                <ul className="nav nav-pills justify-content-center mb-4">
                    <li className="nav-item">
                        <a className={"nav-link mx-2 " + (this.state.targetGroup != 'etudiant' ? "" : 'active')}
                            onClick={() => this.funChangeState({ targetGroup: 'etudiant' })}>Etudiant</a>
                    </li>
                    <li className="nav-item  mx-2">
                        <a className={"nav-link mx-2 " + (this.state.targetGroup != 'prof' ? "" : 'active')}
                            onClick={() => this.funChangeState({ targetGroup: 'prof' })} >Prof</a>
                    </li>
                </ul>
                {this.state.listPub.length === 0 ?
                    <div className="text-center m-5 p-5">
                        Il n'y a aucun publication à afficher
                 </div>
                    : <Fragment >
                        <Publication getPub={this.getPub} pubEnreg={false} listPub={this.state.listPub} hedenBtnEnr={true} />
                    </Fragment>}
            </Fragment>

        );
    }

    // -------------------------------------------- render ------------------------------------------
    render() {
        return (
            <Fragment>
                {this.state.component != "publication" ?
                    <Spinner /> :
                    <Fragment>
                        {JSON.parse(localStorage.getItem('user') || null).typeUser === 'admin'
                            ? this.FunComponentAdmin()
                            : this.FunComponentPofEtEtudiant()}
                    </Fragment>
                }
            </Fragment>
        );
    }


    funChangeState = (data) => {
        this.setState(data);
        this.getPub(data.targetGroup);
    }

}

export default MesPublications;