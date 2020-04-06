import React, { Fragment } from 'react';


const MessageNavTop = (props) => {
    const { message } = props;
    const itemMessage = message.map(item => {
        return (
            <div key={item.idMessage}>
                <a className={"dropdown-item d-flex align-items-center " + (item.statut === 'non' ? "bg-statut-Message" : " ")}
                 onClick={()=>props.FunGetItemMessage(item)}  >
                    <div className="dropdown-list-image mr-3">
                        {(item.image != null) ? <img className="img-profile rounded-circle" src={"http://127.0.0.1/project/backend/file/user/" + item.image} width="60" height="60" /> :
                            <div className="img-profile rounded-circle imageUser-dropdown pt-2">
                                {item.prenom.charAt(0).toUpperCase()}
                            </div>
                        }
                    </div>
                    <div>
                        <div className="text-truncate">{item.message}</div>
                        <div className="small text-gray-500"> {item.typeUser + " : " + item.prenom + " " + item.nom} · {item.date}</div>
                    </div>
                </a>
            </div>
        );
    });
    return (
        <Fragment>
            {itemMessage}
        </Fragment>
    );

}

export default MessageNavTop;