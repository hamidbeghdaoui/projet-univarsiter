import React, { Fragment, Component } from 'react';
import AjouterPubEtudiant from "./../components/ajouterPubEtudiant";
import AjouterPubProf from "./../components/ajouterPubProf";
import AjouterPubAdmin from "./../components/ajouterPubAdmin";

class AjouterPublication extends Component {
    ComponentAjouter = () => {
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        switch (sessionUser.typeUser) {
            case 'etudiant':
                return (<AjouterPubEtudiant />);
            case 'prof':
                return (<AjouterPubProf />);
            case 'admin':
                return (<AjouterPubAdmin />);
        }
    }

    render() {
        return (
            this.ComponentAjouter()
        );

    }


}

export default AjouterPublication;