import React, { Fragment } from 'react';
import { Link } from "react-router-dom";


const Inscription = (props) => {
    return (
        <Fragment>
            <div className="LOlogin-page">
                <div className="LOform">
                    <h4 className="text-center  text-primary mb-5"> Confirmez votre compte </h4>
                    <form className="LOlogin-form">
                        <input type="text" className="text-center" placeholder="N° Inscription" />
                        <input type="password" className="text-center" placeholder="Mot de passe" />
                        <table align="center" >
                            <tbody>
                                <tr>
                                    <td><label htmlFor="etd">Etudent</label><input type="radio" name="radio" className="check" id="etd" defaultChecked={true} /></td>
                                    <td><label htmlFor="prof">Prof</label><input type="radio" name="radio" className="check" id="prof" /></td>
                                    <td><label htmlFor="admin">Admin</label><input type="radio" name="radio" className="check" id="admin" /></td>
                                </tr>
                            </tbody>

                        </table>
                        <Link className='btn bg-success px-5 text-light' to='/Confirmation-Inscription/'>Confirmez</Link>

                    </form>

                </div>
            </div>
        </Fragment>
    );

}

export default Inscription;
