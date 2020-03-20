import React, { Fragment, Component } from 'react';
class Parametres extends Component {


  render() {
    return (
      <Fragment>
        <div className=" bg-projet mt-5 mx-auto container-sm p-5">
          <h3 className="pb-5 text-center text-primary">Changement d'informations</h3>
          <div className="row">
            <div className="col-6 text-center">
              <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" width="120"
                height="120" />
            </div>
            <div className="col-6 text-center">
              <label htmlFor="file" className="btn bg-success text-light w-100 mt-5">Changement une photo personnelle </label>
            </div>

          </div>
          <input type="file" id="file" hidden={true} />
          <input type="text" className="w-100 text-center mt-2 form-control" defaultValue="hamidBeghdaoui" placeholder="Nom d'utilisateur *" />
          <input type="password" className="w-100 text-center mt-2 form-control" defaultValue="hamidBeghdaoui" placeholder="Mot de passe *" />
          <input type="password" className="w-100 text-center mt-2 form-control" defaultValue="hamidBeghdaoui" placeholder="Confirmation mot de passe *" />
          <input type="email" className="w-100 text-center mt-2 form-control" defaultValue="hamidBeghdaoui@gmail.com" placeholder="Email *" />
          <input type="number" className="w-100 text-center mt-2 form-control" defaultValue="0561353185" placeholder="Phone *" />
          <a className="btn  bg-success w-100 text-light mt-5" >Confirmé</a>


        </div>
      </Fragment>
    );

  }
}

export default Parametres;