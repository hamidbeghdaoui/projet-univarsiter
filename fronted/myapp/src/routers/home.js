import React, { Component, Fragment } from 'react';
import NavLeft from "./../components/navLeft";
import NavTop from "./../components/navTop";
import Footer from "./../components/footer";
import Body from "./../pages/body";
import Alert from "./../helpers/alert";

class Home extends Component {

  state = {
    navleftToggled: false,
    ComponentPage: "Ajouter Publication",
    iduser: 1,
    type: "Prof"
  }

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

  FunscrollTo = () => {
    window.scrollTo(0, 0);
  }


  render() {
    return (
      <Fragment>
        <div id="wrapper">
          <NavLeft classToggled={this.state.navleftToggled} FunNavChaneToggled={this.FunNavChaneToggled}
            ComponentPage={this.state.ComponentPage} FunNavChangePage={this.FunNavChangePage} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <NavTop FunNavChaneToggled={this.FunNavChaneToggled} ComponentPage={this.state.ComponentPage} />
              {/* <Alert /> */}
              <Body ComponentPage={this.state.ComponentPage} />
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

}

export default Home;
