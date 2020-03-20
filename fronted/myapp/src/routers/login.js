import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";
class Login extends Component {


    render() {
        return (
            <Fragment>
                <div className="LOlogin-page">
                    <div className="LOform">
                        <h2 className="text-center  text-primary mb-5"> Se connecter</h2>

                        <form className="LOlogin-form">
                            <input type="text" className="text-center" placeholder="Nom d'utilisateur" />
                            <input type="password" className="text-center" placeholder="Mot de passe" />
                            <Link className='btn bg-success px-5 text-light' to='/'>Contactez-nous</Link>
                            <p className="LOmessage">Sinon, votre compte n'est pas confirmé ? <Link to="/Inscription/"> Confirmez votre compte</Link></p>
                        </form>
                    </div>
                </div>
            </Fragment>
        );

    }
}

export default Login;