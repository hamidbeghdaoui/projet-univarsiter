import React, { Fragment } from 'react';


const ItemListeProf = (props) => {
    const {funSetInfoProfPub , rech, listProf } = props;
    let itemListe;
    if (!rech) {
        itemListe = listProf.map(item => {
            return (
                <div className="card text-white bg-info mb-3" key={item.id_prof}>
                    <div className="card-header">
                        <div className="w-100">
                            <div className="">
                                <div className="float-left ">
                                    {
                                        item.image != null
                                            ?
                                            <div>
                                                <img className="rounded-circle mr-1" src={"http://127.0.0.1/project/backend/file/user/" + item.image} width="60"
                                                    height="60" />
                                                <span className=" small ">{item.nom + " " + item.prenom}</span>

                                            </div>
                                            :
                                            <div className="row pl-2">
                                                <div className=" ImageUser pt-2 h1 bg-light mx-1">
                                                    {item.prenom.charAt(0).toUpperCase()}
                                                </div>
                                                <span className=" col small text-left pt-3 pl-0  ">{item.nom + " " + item.prenom}</span>
                                            </div>
                                    }

                                </div>
                                <div className="float-right mt-3 mr-2 small">{"Prof ("+item.role+"): " + item.annee + "(" + item.nom_spec + ") " + item.nom_module}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <a className="btn btn-dark mt-1 mx-1 text-light size-1" onClick={()=>props.funpushPageChate(item)}>
                                Envoyer un message
                           </a>

                            <a className="btn btn-dark mt-1 mx-1 text-light size-1" 
                            onClick={()=>funSetInfoProfPub(item)}>
                                Les publications
                           </a>
                        </div>
                    </div>
                </div>
            );
        });
    } else {

    }
    return (
        <Fragment>
            {itemListe}
        </Fragment >
    );

}

export default ItemListeProf;