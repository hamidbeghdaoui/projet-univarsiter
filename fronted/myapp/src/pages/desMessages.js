import React, { Component, Fragment } from 'react';
import Message from "./message";
class DesMessages extends Component {
    state = {
        navMessage: "Tous les messages",
        chate: true
    }

    FunNavChangeItemNavMessage = (Item) => {
        this.setState({
            navMessage: Item
        });
    }
    FunNavChangeBoolChate = () => {
        this.setState({
            chate: !this.state.chate
        });
    }


    ListMessage = () => {
        return (
            <div aria-labelledby="messagesDropdown">
                <div className="dropdown-header my-5">
                    <div className={"float-sm-left nav-message px-2 py-1 mb-4 text-center " +
                        (this.state.navMessage === "Tous les messages" ? "nav-message-active" : "")}
                        onClick={() => this.FunNavChangeItemNavMessage("Tous les messages")}>Tous les messages</div>

                    <div className="float-sm-right nav text-center">
                        <li className={"nav-item nav-message px-2 py1 " +
                            (this.state.navMessage === "Etudiant" ? "nav-message-active" : "")}
                            onClick={() => this.FunNavChangeItemNavMessage("Etudiant")}>Etudiant</li>

                        <li className={"nav-item nav-message px-2 py1 " +
                            (this.state.navMessage === "Prof" ? "nav-message-active" : "")}
                            onClick={() => this.FunNavChangeItemNavMessage("Prof")}>Prof</li>

                        <li className={"nav-item nav-message px-2 py1 " +
                            (this.state.navMessage === "Admin" ? "nav-message-active" : "")}
                            onClick={() => this.FunNavChangeItemNavMessage("Admin")}>Admin</li>
                    </div>
                </div>
                <a className="dropdown-item d-flex align-items-center btn" onClick={() => this.FunNavChangeBoolChate()}>
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" width="60" height="60" alt="" />
                        <div className="status-indicator bg-success"></div>
                    </div>
                    <div className="font-weight-bold">
                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me...</div>
                        <div className="small text-gray-500">Etudiant SIQ G2: aba ebdelnour · 6-02-2020</div>
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center  btn">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" width="60" height="60" alt="" />
                        <div className="status-indicator bg-warning"></div>
                    </div>
                    <div>
                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me...</div>
                        <div className="small text-gray-500">Prof SE2: Morgan Alvarez · 2-01-2020</div>
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center  btn">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" width="60" height="60" alt="" />
                        <div className="status-indicator bg-success"></div>
                    </div>
                    <div>
                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me...</div>
                        <div className="small text-gray-500">Admin Affichage:  Morgan Alvarez · 2-05-2019</div>
                    </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500 btn" href="#">Read More Messages</a>
            </div>
        );
    }

    chate = () => {
        return (
            <Message FunNavChangeBoolChate={this.FunNavChangeBoolChate} />
        );
    }

    render() {

        return (
            <Fragment>
                {
                    (this.state.chate == true) ? this.chate() : this.ListMessage()
                }

            </Fragment>
        );
    }

}

export default DesMessages;

