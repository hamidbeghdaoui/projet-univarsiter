import React, { Component, Fragment } from 'react';
import Publication from "./../components/publication";
import axios from "axios";
import Spinner from "./../helpers/spinner";
import HOST from "./../helpers/host";

class PublicationsEnregistrées extends Component {
  // ----------------------------------------- data----------------------------------------
  state = {
    component: "spinner",
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
    this.getPubEnreg();
  }

  //---------------------------------------------contact server----------------------------------------
  getPubEnreg = () => {
    var sessionUser = JSON.parse(localStorage.getItem('user') || null);
    let API_PATH = "";
    switch (sessionUser.typeUser) {
      case "etudiant":
        API_PATH =  HOST + "/project/backend/ajax/etudiant.php";
        break;
      case "prof":
        API_PATH =  HOST + "/project/backend/ajax/prof.php";
        break;
    }
    console.log(sessionUser);
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: {
        but: 'get-my-pub-enreg',
        id_typeUser: sessionUser.id_typeUser,
        id_User: sessionUser.id
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
  FunComponent = () => {
    return (
      this.state.listPub.length === 0 ?
        <div className="text-center m-5 p-5">
          Il n'y a aucun publication à afficher
        </div>
        : <Publication getPub={this.getPubEnreg} pubEnreg={true} listPub={this.state.listPub} />
    );
  }

  // -------------------------------------------- render ------------------------------------------
  render() {
    return (
      <Fragment>
        {this.state.component === "publication" ? this.FunComponent() : <Spinner />}
      </Fragment>
    );
  }





}

export default PublicationsEnregistrées;
