import React, { Component, Fragment } from 'react';
import Message from "./message";
import ItemListeMessage from "./../components/itemListeMessage";
class DesMessages extends Component {
    // ----------------------------------------- data----------------------------------------
    state = {
        navMessage: "Tous les messages",
        chate: false,
        itemMessage: null,
    }

    // -------------------------------------------- Components ------------------------------------------

    ListMessage = () => {
        return (
            <div aria-labelledby="messagesDropdown">
                <div className="dropdown-header my-5">
                    <div className={"float-sm-left nav-message px-2 py-1 mb-4 text-center " +
                        (this.state.navMessage === "Tous les messages" ? "nav-message-active" : "")}
                        onClick={() => this.FunNavChangeItemNavMessage("Tous les messages")}>Tous les messages</div>

                    <div className="float-sm-right nav text-center">
                        <li className={"nav-item nav-message px-2 py1 " +
                            (this.state.navMessage === "etudiant" ? "nav-message-active" : "")}
                            onClick={() => this.FunNavChangeItemNavMessage("etudiant")}>Etudiant</li>

                        <li className={"nav-item nav-message px-2 py1 " +
                            (this.state.navMessage === "prof" ? "nav-message-active" : "")}
                            onClick={() => this.FunNavChangeItemNavMessage("prof")}>Prof</li>

                        <li className={"nav-item nav-message px-2 py1 " +
                            (this.state.navMessage === "admin" ? "nav-message-active" : "")}
                            onClick={() => this.FunNavChangeItemNavMessage("admin")}>Admin</li>
                    </div>
                </div>
                <ItemListeMessage TypeMessage={this.state.navMessage} message={this.props.message}
                    FunGetItemMessage={this.FunGetItemMessage} />

            </div>
        );
    }

    chate = () => {
        return (
            <Message FunNavChangeBoolChate={this.FunNavChangeBoolChate} itemMessage={this.state.itemMessage}
                chate={this.state.chate} />
        );
    }

    // -------------------------------------------- render ------------------------------------------
    render() {

        return (
            <Fragment>
                {
                    (this.state.chate == true) ? this.chate() : this.ListMessage()
                }

            </Fragment>
        );
    }


    // -------------------------------------------- function ------------------------------------------
    FunNavChangeItemNavMessage = (Item) => {
        this.setState({
            navMessage: Item
        });
    }
    FunNavChangeBoolChate = () => {
        this.setState({
            chate: false
        });
        console.log(this.state.chate);
    }
    FunGetItemMessage = (item) => {
        this.setState({
            chate: true,
            itemMessage: item
        });
        console.log(item);

    }

}

export default DesMessages;

