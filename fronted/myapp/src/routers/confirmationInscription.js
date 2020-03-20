import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";
class ConfirmationInscription extends Component {


  render() {
    return (
      <Fragment>
        <div className=" bg-projet mt-5 mx-auto container-sm p-5">
          <h3 className="pb-5 text-center text-primary">Ajouter des informations</h3>
          <label htmlFor="file" className="btn bg-success w-100 text-light">une photo personnelle </label>
          <input type="file" id="file" hidden={true} />
          <input type="text" className="w-100 text-center mt-2 form-control" placeholder="Nom d'utilisateur *" />
          <input type="password" className="w-100 text-center mt-2 form-control" placeholder="Mot de passe *" />
          <input type="password" className="w-100 text-center mt-2 form-control" placeholder="Confirmation mot de passe *" />
          <input type="email" className="w-100 text-center mt-2 form-control" placeholder="Email *" />
          <input type="number" className="w-100 text-center mt-2 form-control" placeholder="Phone *" />
          <Link className="btn  bg-success w-100 text-light mt-5" to='/login/'>Confirmé</Link>


        </div>
      </Fragment>
    );

  }
}

export default ConfirmationInscription;