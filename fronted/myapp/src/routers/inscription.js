import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./../helpers/spinner";
import Alert from "./../helpers/alert";
import HOST from "./../helpers/host";
class Inscription extends Component {

    // ----------------------------------------- data----------------------------------------
    state = {
        POST: {
            but: 'inscription',
            typeUser: 'etudiant',
            matricule: '',
            password_inscription: ''
        },
        component: "inscription",
        error: null,
        alert: {
            color: 'warning',
            title: 'Attention',
            subject: 'Tous les champs doivent être remplis',

        }

    }

    //---------------------------------------------When the page loads----------------------------------------
    componentDidMount() {
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        if (sessionUser != null) document.getElementById("home").click();
    }

    //---------------------------------------------contact server----------------------------------------
    handleSubmit = e => {
        e.preventDefault();
        const { but, typeUser, matricule, password_inscription } = this.state.POST;
        if (but && typeUser.trim() && matricule.trim() && password_inscription) {
            this.setState({
                component: "spinner"
            });
            const API_PATH =  HOST + "/project/backend/ajax/user.php";
            axios({
                method: 'post',
                url: `${API_PATH}`,
                headers: { 'content-type': 'application/json' },
                data: this.state.POST
            })
                .then(result => {
                    if (result.data === false) {
                        this.setState({
                            POST: {
                                but: 'inscription',
                                typeUser: 'etudiant',
                                matricule: '',
                                password_inscription: ''
                            },
                            component: "inscription",
                            error: 'insc',
                            alert: {
                                color: 'info',
                                title: 'REMARQUE',
                                subject: "Soit vous vous êtes inscrit, soit vous n'êtes pas dans l'administration",

                            }
                        });
                    } else {
                        this.setState({
                            component: "inscription",
                            error: null
                        });

                        //   setDataUser('isInscription' ,{'hamid':'walid'});
                        localStorage.setItem('isInscription', JSON.stringify(result.data));
                        document.getElementById("Confirmation-Inscription").click();
                    }

                })
                .catch(error => this.setState({ error: error.message }));

        } else {
            this.setState({
                error: 'videInput',
                alert: {
                    color: 'warning',
                    title: 'Attention',
                    subject: 'Tous les champs doivent être remplis',
                }
            });
        }

    }

    // -------------------------------------------- Content ------------------------------------------
    ComponentInscription = () => {
        return (
            <Fragment>
                {(this.state.error === null) ? "" : <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} />}
                <div className="LOlogin-page">
                    <div className="LOform">
                        <h4 className="text-center  text-primary mb-5" > Confirmez votre compte </h4>
                        <form className="LOlogin-form">
                            <input type="text" className="text-center" onChange={this.funChangeValueInputMatrcil} placeholder="N° Inscription" />
                            <input type="password" className="text-center" onChange={this.funChangeValueInputPassword} placeholder="Mot de passe" />
                            <table align="center" >
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="etd">Etudent</label>
                                            <input type="radio" className="check" value="etudiant"
                                                checked={this.state.POST.typeUser === 'etudiant'} onChange={this.funChangeValueInputRadio} id="etd" />
                                        </td>
                                        <td>
                                            <label htmlFor="prof">Prof</label>
                                            <input type="radio" className="check" value="prof"
                                                checked={this.state.POST.typeUser === 'prof'} onChange={this.funChangeValueInputRadio} id="prof" />
                                        </td>
                                        <td>
                                            <label htmlFor="admin">Admin</label>
                                            <input type="radio" className="check" value="admin"
                                                checked={this.state.POST.typeUser === 'admin'} onChange={this.funChangeValueInputRadio} id="admin" />
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                            <button className='btn bg-success px-5 text-light' onClick={this.handleSubmit}>Confirmez</button>

                        </form>

                    </div>
                </div>
            </Fragment>
        );
    }

    // -------------------------------------------- render ------------------------------------------
    render() {
        return (
            <Fragment>
                {
                    (this.state.component === "inscription") ? this.ComponentInscription() : <Spinner />
                }
                <Link className='btn bg-success px-5 text-light' id="Confirmation-Inscription" to='/Confirmation-Inscription/' hidden>Contactez-nous</Link>
                <Link className='btn bg-success px-5 text-light' id="home" to='/' hidden></Link>
            </Fragment>
        );
    }

    // -------------------------------------------- function ------------------------------------------*
    funChangeValueInputMatrcil = e => {
        this.setState({
            POST: {
                but: 'inscription',
                typeUser: this.state.POST.typeUser,
                matricule: e.target.value,
                password_inscription: this.state.POST.password_inscription
            }
        });
    }

    funChangeValueInputPassword = e => {
        this.setState({
            POST: {
                but: 'inscription',
                typeUser: this.state.POST.typeUser,
                matricule: this.state.POST.matricule,
                password_inscription: e.target.value,
            }
        });
    }

    funChangeValueInputRadio = e => {
        this.setState({
            POST: {
                but: 'inscription',
                typeUser: e.target.value,
                matricule: this.state.POST.matricule,
                password_inscription: this.state.POST.password_inscription,
            }
        });
    }

    // -------------------------------- Alert -----------------------------------------
    funHidenAlert = () => {
        this.setState({
            error: null,
        });
    }

}



export default Inscription;
