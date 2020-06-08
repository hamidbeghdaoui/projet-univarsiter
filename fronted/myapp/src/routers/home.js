import React, { Component, Fragment } from 'react';
import NavLeft from "./../components/navLeft";
import NavTop from "./../components/navTop";
import Footer from "./../components/footer";
import Body from "./../pages/body";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./../helpers/spinner";
import HOST from "./../helpers/host";
import NotAffectation from "./../helpers/notAffectation";

class Home extends Component {

  // ----------------------------------------- data----------------------------------------
  state = {
    navleftToggled: false,
    ComponentPage: "Accueil",
    component: "spinner",
    Affectation: true,
    user: null,
    message: [],
    itemMessage: null
  }

  //---------------------------------------------When the page loads----------------------------------------
  componentDidMount() {
    // localStorage.removeItem('user');
    var sessionUser = JSON.parse(localStorage.getItem('user') || null);
    console.log(sessionUser);
    if (sessionUser === null) {
      document.getElementById("retursLogin").click();
    } else {
      this.funAccountReview(sessionUser);
      this.funGetALLInformationUser(sessionUser);
    }
  }



  //---------------------------------------------contact server----------------------------------------
  funAccountReview = (sessionUser) => {
    const API_PATH = HOST + "/project/backend/ajax/user.php";
    const { userName, password } = sessionUser;
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: {
        but: 'Confirmation-Login',
        user: userName,
        password: password
      }
    })
      .then(result => {
        console.log('result :', result.data);
        if (result.data === false) {
          localStorage.removeItem('user');
          document.getElementById("retursLogin").click();
        }
      })
      .catch(error => this.setState({ error: error.message }));
  }

  funGetALLInformationUser = (sessionUser) => {
    const API_PATH = HOST + "/project/backend/ajax/user.php";
    const { id_typeUser, typeUser } = sessionUser;
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: {
        but: 'get-Information-User',
        idTypeUser: id_typeUser,
        typeUser: typeUser
      }
    })
      .then(result => {
        console.log('result :', result.data);
        if (result.data === false) {
          localStorage.removeItem('user');
          document.getElementById("retursLogin").click();
        } else {
          this.setState({
            component: "Home",
            user: result.data
          });
        }
      })
      .catch(error => this.setState({ error: error.message }));
  }

  // -------------------------------------------- Content ------------------------------------------
  ComponentInscription = () => {
    return (
      <Fragment>
        <div id="wrapper">
          <NavLeft classToggled={this.state.navleftToggled} FunNavChaneToggled={this.FunNavChaneToggled}
            ComponentPage={this.state.ComponentPage} FunNavChangePage={this.FunNavChangePage} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <NavTop FunNavChaneToggled={this.FunNavChaneToggled} ComponentPage={this.state.ComponentPage} user={this.state.user}
                FunSendMessageHome={this.FunSendMessageHome} FunNavChangePage={this.FunNavChangePage} FunGetItemMessage={this.FunGetItemMessage} />
              {/* <Alert /> */}
              {this.state.Affectation
                ? <Body ComponentPage={this.state.ComponentPage} message={this.state.message}
                  itemMessagePushInNav={this.state.itemMessage} FunGetItemMessage={this.FunGetItemMessage} NotAffectation={this.NotAffectation} />
                : <NotAffectation />
              }
            </div>
            <Footer />
          </div>

        </div>
        <a className="scroll-to-top rounded" onClick={this.FunscrollTo}>
          <i className="fas fa-angle-up text-light"></i>
        </a>
      </Fragment>
    );
  }

  // -------------------------------------------- render ------------------------------------------
  render() {
    return (
      <Fragment>
        {(this.state.component === "Home") ? this.ComponentInscription() : <Spinner />}
        <Link className='btn bg-success px-5 text-light' id="retursLogin" to='/Login/' hidden></Link>
      </Fragment>
    );
  }

  // -------------------------------------------- function ------------------------------------------
  FunNavChaneToggled = () => {
    this.setState({
      navleftToggled: !this.state.navleftToggled
    });
  }

  FunNavChangePage = (page) => {
    this.setState({
      ComponentPage: page
    });
    this.FunscrollTo();
  }
  FunSendMessageHome = (message) => {
    this.setState({
      message: message
    });
  }

  FunscrollTo = () => {
    window.scrollTo(0, 0);
  }

  FunGetItemMessage = (item) => {
    this.setState({
      ComponentPage: "Des Messages",
    });
    console.log('home :' + item);

  }

  NotAffectation = () => {
    this.setState({
      Affectation: false
    });
  }

  // -------------------------------- Alert -----------------------------------------
  funHidenAlert = () => {
    this.setState({
      error: null,
    });
  }



}

export default Home;
