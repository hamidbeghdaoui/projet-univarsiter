import React, { Component, Fragment } from 'react';
import MesaageNavTop from "./../components/mesaageNavTop";
import axios from "axios";
class NavTop extends Component {


  // ----------------------------------------- data----------------------------------------
  state = {
    message: null,
    statutNon: 0
  }

  //---------------------------------------------When the page loads----------------------------------------
  componentDidMount() {
    this.getMessage();
  }

  //---------------------------------------------contact server----------------------------------------
  getMessage = async () => {
    const API_PATH = "http://127.0.0.1/project/backend/ajax/message.php";
    var sessionUser = JSON.parse(localStorage.getItem('user') || null);
    await this.sleep(5000);
    for (; ;) {
      await this.sleep(1000);
      axios({
        method: 'post',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        data: {
          but: 'get-Message-navBar',
          idUser: sessionUser.id,
        }
      })
        .then(result => {
          if (result.data.length === 0) {
            this.setState({
              message: null
            });
          } else {
            this.setState({
              message: result.data,
            });
            this.FunNumberStatutNon();
            this.props.FunSendMessageHome(result.data);
            // localStorage.setItem('datamessage', JSON.stringify(result.data));
          }
          console.log(this.state.message);
        })
        .catch(error => this.setState({ error: error.message }));
    }
  };

  // -------------------------------------------- render ------------------------------------------
  render() {
    const { nom, prenom, image } = this.props.user;
    return (
      <Fragment>
        {/* <!-- Topbar --> */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          {/* <!-- Sidebar Toggle (Topbar) --> */}
          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={this.props.FunNavChaneToggled}>
            <i className="fa fa-bars " ></i>
          </button>
          <li className="nav-item btn mr-auto text-primary">{this.props.ComponentPage}</li>


          {/* <!-- Topbar Navbar --> */}
          <ul className="navbar-nav ml-auto">
            {/* <!-- Nav Item - Alerts --> */}


            <li className="nav-item dropdown no-arrow mx-1" onClick={() => window.location.reload(false)}>
              <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-fw fa-sync-alt text-success" ></i>
              </a>
            </li>
            {/* <!-- Nav Item - Messages --> */}
            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-envelope fa-fw"></i>
                {/* <!-- Counter - Messages --> */}
                <span className="badge badge-danger badge-counter">
                  {(this.state.statutNon === 0) ? "" : this.state.statutNon}
                </span>
              </a>
              {/* <!-- Dropdown - Messages --> */}
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                <h6 className="dropdown-header">
                  Des messages
                </h6>
                {
                  (this.state.message === null) ?
                    <div className="my-5 text-center text-muted"> No messages </div>
                    : <MesaageNavTop message={this.state.message} FunGetItemMessage={this.props.FunGetItemMessage} />}
                <a className="dropdown-item text-center small text-gray-500" href="#"
                  onClick={() => this.props.FunGetItemMessage("")}>Read More Messages</a>
              </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>

            {/* <!-- Nav Item - User Information --> */}
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{prenom} {nom}</span>
                {(image != null) ? <img className="img-profile rounded-circle" src={"http://127.0.0.1/project/backend/file/user/" + image} width="60" height="60" /> :
                  <div className="img-profile rounded-circle logoUser">
                    {prenom.charAt(0).toUpperCase()}
                  </div>
                }
              </a>
              {/* <!-- Dropdown - User Information --> */}
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">

                <a className="dropdown-item" href="#" onClick={() => this.props.FunNavChangePage("Paramètres")}>
                  <i className="fas fa-cog fa-sm fa-fw mr-2 text-gray-400"></i>
                  Paramètres
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={this.deconnecter}>
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Se Déconnecter
                </a>
              </div>
            </li>

          </ul>

        </nav>
        {/* <!-- End of Topbar --> */}

      </Fragment>
    );
  }

  // -------------------------------------------- function ------------------------------------------
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  FunNumberStatutNon = () => {
    const resultFilter = this.state.message.filter(item => item.statut === 'non');
    this.setState({
      statutNon: resultFilter.length
    });

  }

  deconnecter = () => {
    localStorage.removeItem('user');
    window.location.reload(false);
  }

}

export default NavTop;
