import React, { Component, Fragment } from 'react';
import Accueil from "./../pages/accueil";
import AjouterPublication from "./../pages/ajouterPublication";
import MesPublications from "./../pages/mesPublications";
import PublicationsEnregistrées from "./../pages/publicationsEnregistrées";
import DesMessages from "./../pages/desMessages";
import L_Administration from "./../pages/l_Administration";
import Prof from "./../pages/prof";
import Etudiant from "./../pages/etudiant";
import Parametres from "./../pages/parametres";
class Body extends Component {
  funPage = () => {
    switch (this.props.ComponentPage) {
      case "Accueil":
        return (<Accueil />);
      case "Ajouter Publication":
        return (<AjouterPublication />);
      case "Mes Publications":
        return (<MesPublications />);
      case "Publications Enregistrées":
        return (<PublicationsEnregistrées />);
      case "Des Messages":
        return (<DesMessages message = {this.props.message}  />);
      case "Prof":
        return (<Prof />);
      case "L'administration":
        return (<L_Administration />);
      case "Etudiant":
        return (<Etudiant />);
      case "Paramètres":
        return (<Parametres />);
    }

  }
  render() {
    return (
      <Fragment>
        <div className="container-fluid">
          {this.funPage()}
        </div>
      </Fragment>
    );
  }

}

export default Body;

