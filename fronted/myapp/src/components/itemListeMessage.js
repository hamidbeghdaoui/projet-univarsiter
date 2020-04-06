import React, { Fragment } from 'react';


const ItemListeMessage = (props) => {
    const { message } = props;
    const resaltFilter = message.filter(item => item.typeUser === props.TypeMessage || props.TypeMessage === "Tous les messages");
    const itemListeMessage = resaltFilter.map(item => {
        return (
            <a className="dropdown-item d-flex align-items-center btn" key={item.idMessage}
                onClick={() => props.FunGetItemMessage(item)}>
                <div className="dropdown-list-image mr-3">
                    {(item.image != null) ? <img className="rounded-circle" src={"http://127.0.0.1/project/backend/file/user/" + item.image} width="60" height="60" alt="" /> :
                        <div className="img-profile rounded-circle ImageUser pt-2 h1">
                            {item.prenom.charAt(0).toUpperCase()}
                        </div>
                    }
                    <div className="status-indicator bg-success"></div>
                </div>
                <div className={(item.statut === 'non' ? "font-weight-bold" : "")}>
                    <div className="text-truncate p-itemListeMesage">{item.message}</div>
                    <div className="small text-gray-500">{item.typeUser + " : " + item.prenom + " " + item.nom} · {item.date}</div>
                </div>
            </a>
        );
    });

    return (
        <Fragment>
            {(resaltFilter.length != 0) ? itemListeMessage : <div className="my-5 text-center text-muted p-5"> No messages </div>

            }
        </Fragment>
    );

}

export default ItemListeMessage;