import React, { Fragment } from 'react';
import TypeFilePosible from "./../helpers/typeFilePosible";
import HOST from "./../helpers/host";


const ItemMessageChate = (props) => {
    const { messageChate } = props;
    var sessionUser = JSON.parse(localStorage.getItem('user') || null);
    //  const resaltFilter = message.filter(item => item.typeUser === props.TypeMessage || props.TypeMessage === "Tous les messages");
    const itemListeMessage = messageChate.map(item => {
        if (item.typeMessage === 'text') {
            return (
                <div className="w-100 bg-dark" key={item.id}>
                    <div className={"w-50 rounded  mx-1 my-1 " + (item.id_userEnvoye === sessionUser.id ? item.statut === 'non' ? "bg-primary float-left text-left text-light" : "bg-success float-left text-left text-light" : "bg-light float-right text-dark")}>
                        <p className="text-justify  m-1 p-message ">{item.message}</p>
                        <span className="date-message mr-3 float-right my-1">{item.date}</span>
                    </div>
                </div>
            );
        }
        if (TypeFilePosible(item.typeMessage, 'image')) {
            return (
                <div className="w-100 bg-dark" key={item.id}>
                    <div className={"w-50 rounded  mx-1 my-1 " +
                        (item.id_userEnvoye === sessionUser.id ? item.statut === 'non' ? "bg-primary float-left text-left text-light" : "bg-success float-left text-left text-light" : "bg-light float-right text-dark")}>
                        <div className="text-center">
                            <img src={HOST + "/project/backend/file/file message/" + item.message} className="img-fluid" alt="Responsive image" />
                        </div>
                        <span className="date-message mr-3 float-right my-1">{item.date}</span>
                        <span className="date-message ml-3 float-left my-1  btn p-0">
                            <a href={HOST + "/project/backend/file/file message/" + item.message} download >
                                <i className={"fas fa-download fa-sm  mr-2 " + (item.id_userEnvoye === sessionUser.id ? "text-light" : "")}>  </i>
                            </a>
                        </span>
                    </div>
                </div>
            );
        } else if (TypeFilePosible(item.typeMessage, 'file')) {
            return (
                <div className="w-100 bg-dark" key={item.id}>
                    <div className={"w-50 rounded  mx-1 my-1 " +
                        (item.id_userEnvoye === sessionUser.id ? item.statut === 'non' ? "bg-primary float-left text-left text-light" : "bg-success float-left text-left text-light" : "bg-light float-right text-dark")}>
                        <p className=" m-1 p-message h1 mt-3 text-center">{item.message}</p>
                        <span className="date-message mr-3 float-right my-1">{item.date}</span>
                        <span className="date-message ml-3 float-left my-1  btn p-0">
                            <a href={HOST + "/project/backend/file/file message/" + item.message} download >
                                <i className={"fas fa-download fa-sm  mr-2 " + (item.id_userEnvoye === sessionUser.id ? "text-light" : "")}>  </i>
                            </a>
                        </span>
                    </div>
                </div>
            );
        }
        if (item.typeMessage === 'line') {
            return (
                <div className="w-100 bg-dark" key={item.id}>
                    <div className={"w-50 rounded  mx-1 my-1 " +
                        (item.id_userEnvoye === sessionUser.id ? item.statut === 'non' ? "bg-primary float-left text-left text-light" : "bg-success float-left text-left text-light" : "bg-light float-right text-dark")}>
                        <div className="m-1 p-message p-1">
                            <a className={(item.id_userEnvoye === sessionUser.id ? "text-light" : "")} href={item.message} target="_blank"> {item.message}</a>
                        </div>
                        <span className="date-message mr-3 float-right my-1">{item.date}</span>
                    </div>
                </div>
            );
        }


    });

    return (
        <Fragment>
            {itemListeMessage}
        </Fragment>
    );

}

export default ItemMessageChate;