import React, { Fragment, Component } from 'react';
import ProfForEtudiant from "./../components/profForEtudiant";
import ProfForProf from "./../components/profForProf";


class Prof extends Component {

    ComponentProf = () => {
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        switch (sessionUser.typeUser) {
            case 'etudiant':
                return (<ProfForEtudiant />);
            case 'prof':
                return (<ProfForProf />);
        }
    }

    render() {
        return (
            this.ComponentProf()
        );

    }


}

export default Prof;