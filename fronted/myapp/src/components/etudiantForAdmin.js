import React, { Fragment, Component } from 'react';
import ItemListeProf from "./itemListeProf";
import Publication from "./publication";
import ItemListeResultCher from "./itemListeResultCher";
import Spinner from "../helpers/spinner";
import Message from "../pages/message";
import HOST from "../helpers/host";

import axios from "axios";


class EtudiantForAdmin extends Component {
   // ----------------------------------------- data----------------------------------------
   state = {
    component: "spinner",
    listEtudiant: [],
    listGroup: [],
    listPub: [],
    infoEtudiantPub: null,
    itemMessage: null,
    resultRech: [],
    spinnerCher: false,
    inputcher: '',
    titleGroup: ''
}

//---------------------------------------------When the page loads----------------------------------------
componentDidMount() {
    this.getAllGroup();
}

//---------------------------------------------contact server----------------------------------------
getMyEtudiant = (Group) => {
    const API_PATH = HOST + "/project/backend/ajax/prof.php";
    axios({
        method: 'post',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        data: {
            but: 'get-all-myEtudiant',
            id_Group: Group.id_grp,
        }
    })
        .then(result => {
            console.log(result.data);
            this.setState({
                component: "EtudiantGroup",
                listEtudiant: result.data,
                titleGroup: Group.nom_sec + " / " + Group.nom_grp

            });
        })
        .catch(error => this.setState({ error: error.message }));

};

getAllGroup = () => {
    const API_PATH = HOST + "/project/backend/ajax/faculty.php";
    var sessionUser = JSON.parse(localStorage.getItem('user') || null);
    // console.log(sessionUser);
    axios({
        method: 'post',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        data: {
            but: 'get-all-group',
        }
    })
        .then(result => {
            console.log(result.data);
            this.setState({
                component: "etudiant",
                listGroup: result.data

            });
        })
        .catch(error => this.setState({ error: error.message }));

};

getResaultCher = (moteDeCHer) => {
    const API_PATH = HOST + "/project/backend/ajax/prof.php";
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
        }
    })
        .then(result => {
            // console.log(result.data);
            this.setState({
                resultRech: result.data,
                spinnerCher: false
            });
        })
        .catch(error => this.setState({ error: error.message }));

};

// ----------------------------------------------- Component --------------------------------------

ItemListeGroup = (itemGroup) => {
    // console.log(itemGroup);
    const itemListe = itemGroup.map(item => {
        return (
            <li className="btn btn-light list-group-item text-left text-muted " key={item.id_grp}
                onClick={() => this.getMyEtudiant(item)}>
                {item.nom_sec + "/" + item.nom_grp}
            </li>
        );
    });
    return itemListe;

}

ItemListeSpec = () => {
    // console.log(this.state.listGroup);
    const itemListe = this.state.listGroup.map(item => {
        return (
            <div className="card" key={item.id_spec}>
                <div className="card-header" id={"heading" + item.id_spec}>
                    <h2 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse" + item.id_spec} aria-expanded="true" aria-controls={"collapse" + item.id_spec}>
                            {item.annee + " " + item.nom_spec + " #" + item.id_spec}
                        </button>
                    </h2>
                </div>

                <div id={"collapse" + item.id_spec} className="collapse " aria-labelledby={"heading" + item.id_spec} data-parent="#accordionExample">
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            {this.ItemListeGroup(item.plus)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    });
    return itemListe;

}

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
                                            <img className="rounded-circle mr-1" src={HOST + "/project/backend/file/user/" + item.image} width="60"
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
                                            <img className="rounded-circle mr-1" src={HOST + "/project/backend/file/user/" + item.image} width="60"
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

FunComponentFaculty = () => {
    return (
        <div id="accordionExample">
            {this.state.listGroup.length != 0
                ?
                this.ItemListeSpec()
                :
                <div className="text-center text-muted m-5 p-5">
                    Il n'y a aucun specialeté à afficher
                 </div>
            }
        </div>
    );
}

FunComponentMain = () => {
    return (

        <Fragment>

            <div className="w-100 my-5 row">
                <h2 className="text-muted  col-6 text-left ml-3"> Groupe :</h2>
                <button className="btn border-secondary ml-auto" type="button" onClick={this.funReturnPageCherch} >Rechercher un etudiant</button>
            </div>
            {
                this.FunComponentFaculty()
            }
        </Fragment>
    );
}

FunComponentEtudiant = () => {
    return (
        <Fragment>
            <div className="w-100 my-3">
                <span className="float-left btn mr-5" onClick={() => this.funReturnPageEtudiant()} >
                    <i className="fas fa-arrow-left  text-muted mt-2 "></i>
                </span>
                <span className=" text-muted h2">
                    {this.state.titleGroup + " :"}
                </span>
            </div>
            <div className="w-100 my-5">
                {this.state.listEtudiant.length != 0
                    ?
                    this.ItemListeEtudiant()
                    :
                    <div className="text-center text-muted m-5 p-5">
                        Il n'y a aucun etudiant à afficher
                     </div>
                }
            </div>

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
                                            <img className="rounded-circle mr-1" src={HOST + "/project/backend/file/user/" + infoEtudiantPub.image} width="60"
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
                <div className="text-center text-muted m-5 p-5">
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
        case "EtudiantGroup":
            return (
                <Fragment>
                    {this.FunComponentEtudiant()}
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

export default EtudiantForAdmin;