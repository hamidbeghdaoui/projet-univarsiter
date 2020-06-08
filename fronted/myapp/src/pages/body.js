import React, { Component, Fragment } from 'react';
import Accueil from "./../pages/accueil";
import AccueilAdmin from "./../pages/accueilAdmin";
import Departement from "./../pages/departement";
import AjouterPublication from "./../pages/ajouterPublication";
import MesPublications from "./../pages/mesPublications";
import PublicationsEnregistrées from "./../pages/publicationsEnregistrées";
import DesMessages from "./../pages/desMessages";
import L_Administration from "./../pages/l_Administration";
import Prof from "./../pages/prof";
import Etudiant from "./../pages/etudiant";
import Parametres from "./../pages/parametres";
class Body extends Component {

  funPageEtudiantOuProf = () => {
    switch (this.props.ComponentPage) {
      case "Accueil":
        return (<Accueil NotAffectation={this.props.NotAffectation} />);
      case "Ajouter Publication":
        return (<AjouterPublication />);
      case "Mes Publications":
        return (<MesPublications />);
      case "Publications Enregistrées":
        return (<PublicationsEnregistrées />);
      case "Des Messages":
        return (<DesMessages message={this.props.message} />);
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

  funPageAdmin = () => {
    switch (this.props.ComponentPage) {
      case "Accueil":
        return (<AccueilAdmin />);
      case "Departement":
        return (<Departement />);
      case "Ajouter Publication":
        return (<AjouterPublication />);
      case "Mes Publications":
        return (<MesPublications />);
      case "Publications Enregistrées":
        return (<PublicationsEnregistrées />);
      case "Des Messages":
        return (<DesMessages message={this.props.message} />);
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
    var sessionUser = JSON.parse(localStorage.getItem('user') || null);
    const { id_typeUser, typeUser } = sessionUser;
    return (
      <Fragment>
        <div className="container-fluid">
          {typeUser === 'admin' ? this.funPageAdmin()
          : this.funPageEtudiantOuProf()
         
          }
        </div>
      </Fragment>
    );
  }

}

export default Body;

