import React, { Fragment, Component } from 'react';
import AjouterPubEtudiant from "./../components/ajouterPubEtudiant";
import AjouterPubProf from "./../components/ajouterPubProf";

class AjouterPublication extends Component {
    ComponentAjouter = () => {
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        switch (sessionUser.typeUser) {
            case 'etudiant':
                return (<AjouterPubEtudiant />);
            case 'prof':
                return (<AjouterPubProf />);
        }
    }

    render() {
        return (
            this.ComponentAjouter()
        );

    }


}

export default AjouterPublication;