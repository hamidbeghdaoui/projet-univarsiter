import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./../helpers/spinner";
import Alert from "./../helpers/alert";
import HOST from "./../helpers/host";
class Login extends Component {


    // ----------------------------------------- data----------------------------------------
    state = {
        POST: {
            but: 'Login',
            user: '',
            password: ''
        },
        component: "Login",
        error: null,
        alert: {
            color: 'warning',
            title: 'Attention',
            subject: 'Tous les champs doivent être remplis'
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
        const { user, password } = this.state.POST;
        if (user.trim() && password) {
            this.setState({
                component: "spinner"
            });
            const API_PATH = HOST + "/project/backend/ajax/user.php";
            console.log(API_PATH);
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
                                but: 'Login',
                                user: '',
                                password: ''
                            },
                            component: "Login",
                            error: 'noLogin',
                            alert: {
                                color: 'info',
                                title: 'REMARQUE',
                                subject: "Il n'y a pas de compte avec ce nom d'utilisateur et ce mot de passe"
                            }
                        });
                    } else {
                        console.log(result.data);
                        localStorage.setItem('user', JSON.stringify(result.data));
                        document.getElementById("home").click();
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
                        <h2 className="text-center  text-primary mb-5"> Se connecter</h2>

                        <form className="LOlogin-form">
                            <input type="text" className="text-center" onChange={this.funChangeValueInputUserName} placeholder="Nom d'utilisateur" />
                            <input type="password" className="text-center" onChange={this.funChangeValueInputPassword} placeholder="Mot de passe" />
                            <button className='btn bg-success px-5 text-light' onClick={this.handleSubmit}>Contactez-nous</button>
                            <p className="LOmessage">Sinon, votre compte n'est pas confirmé ? <Link to="/Inscription/"> Confirmez votre compte</Link></p>
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
                {(this.state.component === "Login") ? this.ComponentInscription() : <Spinner />}
                <Link className='btn bg-success px-5 text-light' id="home" to='/' hidden></Link>
            </Fragment>
        );

    }

    // -------------------------------------------- function ------------------------------------------
    funChangeValueInputUserName = e => {
        this.setState({
            POST: {
                but: 'Login',
                user: e.target.value,
                password: this.state.POST.password
            }
        });
        console.log(this.state.POST.user);
    }

    funChangeValueInputPassword = e => {
        this.setState({
            POST: {
                but: 'Login',
                user: this.state.POST.user,
                password: e.target.value
            }
        });
        console.log(this.state.POST.password);
    }

    // -------------------------------- Alert -----------------------------------------
    funHidenAlert = () => {
        this.setState({
            error: null,
        });
    }


}



export default Login;