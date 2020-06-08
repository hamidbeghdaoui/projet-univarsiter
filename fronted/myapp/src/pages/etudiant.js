import React, { Fragment, Component } from 'react';
import EtudiantForEtudiant from "./../components/etudiantForEtudiant";
import EtudiantForProf from "./../components/etudiantForProf";
import EtudiantForAdmin from "../components/etudiantForAdmin";
class Etudiant extends Component {
    ComponentEtudiant = () => {
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        switch (sessionUser.typeUser) {
            case 'etudiant':
                return (<EtudiantForEtudiant />);
            case 'prof':
                return (<EtudiantForProf />);
            case 'admin':
                return (<EtudiantForAdmin />);
        }
    }

    render() {
        return (
            this.ComponentEtudiant()
        );

    }
}

export default Etudiant;




