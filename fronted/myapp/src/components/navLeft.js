import React, { Component, Fragment } from 'react';
class NavLeft extends Component {

  Funcollapsed = () => {
    switch (this.props.ComponentPage) {
      case "Ajouter Publication":
        return "Publications";

      case "Mes Publications":
        return "Publications";

      case "Tous Les Publications":
        return "Publications";

      case "Publications Etudiants":
        return "Publications";

      case "Publications Prof":
        return "Publications";

      case "Publications La Gestion":
        return "Publications";

      case "Publications Enregistrées":
        return "Publications";

      case "Prof":
        return "Les utilisateurs";

      case "L'administration":
        return "Les utilisateurs";

      case "Etudiant":
        return "Les utilisateurs";

    }
  }

  componentEtudiantOuProf = (id_typeUser, typeUser) => {
    return (
      <Fragment>
        <ul className={"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " + (this.props.classToggled === true ? "toggled" : "")} id="accordionSidebar">

          {/* <!-- Sidebar - Brand --> */}
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="" onClick={() => window.location.reload(false)}>
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-graduation-cap"></i>
            </div>
            {typeUser === 'etudiant' ? <div className="sidebar-brand-text mx-3">SD ETUDIANT </div> : ''}
            {typeUser === 'prof' ? <div className="sidebar-brand-text mx-3">SD PROF </div> : ''}
          </a>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />

          {/* <!-- Nav Item - Dashboard --> */}
          <li className={"nav-item " + (this.props.ComponentPage === "Accueil" ? "active" : "")}
            onClick={() => this.props.FunNavChangePage("Accueil")}>
            <a className="nav-link">
              <i className="fas fa-fw fa-home"></i>
              <span>Accueil</span></a>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div className="sidebar-heading">
            Interface
</div>

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className={"nav-item " + (this.Funcollapsed() === "Publications" ? "active" : "")}>
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              {/* <i className="fas fa-fw fa-cog"></i> */}
              <i className="fas fa-fw fa-newspaper"></i>
              <span>Publications</span>
            </a>
            <div id="collapseTwo" className="collapse " aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Pour Publication:</h6>
                <a className={"collapse-item " + (this.props.ComponentPage === "Ajouter Publication" ? "active" : "")}
                  onClick={() => this.props.FunNavChangePage("Ajouter Publication")} >Ajouter Publication</a>

                <a className={"collapse-item " + (this.props.ComponentPage === "Mes Publications" ? "active" : "")}
                  onClick={() => this.props.FunNavChangePage("Mes Publications")} >Mes Publications</a>

                <a className={"collapse-item " + (this.props.ComponentPage === "Publications Enregistrées" ? "active" : "")}
                  onClick={() => this.props.FunNavChangePage("Publications Enregistrées")}  >Publications Enregistrées</a>
              </div>
            </div>
          </li>

          <li className={"nav-item " + (this.props.ComponentPage === "Des Messages" ? "active" : "")}
            onClick={() => this.props.FunNavChangePage("Des Messages")}>
            <a className="nav-link">
              <i className="fas fa-envelope fa-fw"></i>
              <span>Des Messages</span></a>
          </li>
          {/* <!-- Nav Item - Utilities Collapse Menu --> */}

          <li className={"nav-item " + (this.Funcollapsed() === "Les utilisateurs" ? "active" : "")}>
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
              <i className="fas  fa-fw fa-user"></i>
              <span>Les utilisateurs</span>
            </a>
            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Pour Les Utilisateurs:</h6>

                <a className={"collapse-item " + (this.props.ComponentPage === "Prof" ? "active" : "")}
                  onClick={() => this.props.FunNavChangePage("Prof")} >Prof</a>

                <a className={"collapse-item " + (this.props.ComponentPage === "L'administration" ? "active" : "")}
                  onClick={() => this.props.FunNavChangePage("L'administration")} >L'administration</a>

                <a className={"collapse-item " + (this.props.ComponentPage === "Etudiant" ? "active" : "")}
                  onClick={() => this.props.FunNavChangePage("Etudiant")} >Etudiant</a>
              </div>
            </div>
          </li>


          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div className="sidebar-heading">
            Addons
</div>

          {/* <!-- Nav Item - Pages Collapse Menu --> */}




          <li className={"nav-item " + (this.props.ComponentPage === "Paramètres" ? "active" : "")}
            onClick={() => this.props.FunNavChangePage("Paramètres")}>
            <a className="nav-link" >
              <i className="fas fa-fw fa-cog"></i>
              <span>Paramètres</span></a>
          </li>

          <li className="nav-item " onClick={this.deconnecter}>
            <a className="nav-link">
              <i className="fas fa-fw fa-sign-out-alt"></i>
              <span>Se Déconnecter</span></a>
          </li>




          {/* <!-- Divider --> */}
          <hr className="sidebar-divider d-none d-md-block" />

          {/* <!-- Sidebar Toggler (Sidebar) --> */}
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" onClick={this.props.FunNavChaneToggled}></button>
          </div>

        </ul>
      </Fragment>
    );
  }

  componentAdmin = () => {
    return (
      <Fragment>
        <ul className={"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " + (this.props.classToggled === true ? "toggled" : "")} id="accordionSidebar">

          {/* <!-- Sidebar - Brand --> */}
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="" onClick={() => window.location.reload(false)}>
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="sidebar-brand-text mx-3">SD ADMIN </div>
          </a>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />

          {/* <!-- Nav Item - Dashboard --> */}
          <li className={"nav-item " + (this.props.ComponentPage === "Accueil" ? "active" : "")}
            onClick={() => this.props.FunNavChangePage("Accueil")}>
            <a className="nav-link">
              <i className="fas fa-fw fa-home"></i>
              <span>Accueil</span></a>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div className="sidebar-heading">
            Interface
</div>


          <li className={"nav-item " + (this.props.ComponentPage === "Departement" ? "active" : "")}
            onClick={() => this.props.FunNavChangePage("Departement")}>
            <a className="nav-link" >
              <i className="fas fa-university"></i>
              <span>Departement</span></a>
          </li>

          <li className={"nav-item " + (this.Funcollapsed() === "Publications" ? "active" : "")}>
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              {/* <i className="fas fa-fw fa-cog"></i> */}
              <i className="fas fa-fw fa-newspaper"></i>
              <span>Publications</span>
            </a>
            <div id="collapseTwo" className="collapse " aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Pour Publication:</h6>
                <a className={"collapse-item " + (this.props.ComponentPage === "Ajouter Publication" ? "active" : "")}
                  onClick={() => this.props.FunNavChangePage("Ajouter Publication")} >Ajouter Publication</a>

                <a className={"collapse-item " + (this.props.ComponentPage === "Mes Publications" ? "active" : "")}
                  onClick={() => this.props.FunNavChangePage("Mes Publications")} >Mes Publications</a>

              </div>
            </div>
          </li>

          <li className={"nav-item " + (this.props.ComponentPage === "Des Messages" ? "active" : "")}
            onClick={() => this.props.FunNavChangePage("Des Messages")}>
            <a className="nav-link">
              <i className="fas fa-envelope fa-fw"></i>
              <span>Des Messages</span></a>
          </li>
          {/* <!-- Nav Item - Utilities Collapse Menu --> */}

          <li className={"nav-item " + (this.Funcollapsed() === "Les utilisateurs" ? "active" : "")}>
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
              <i className="fas  fa-fw fa-user"></i>
              <span>Les utilisateurs</span>
            </a>
            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Pour Les Utilisateurs:</h6>

                <a className={"collapse-item " + (this.props.ComponentPage === "Prof" ? "active" : "")}
                  onClick={() => this.props.FunNavChangePage("Prof")} >Prof</a>

                <a className={"collapse-item " + (this.props.ComponentPage === "L'administration" ? "active" : "")}
                  onClick={() => this.props.FunNavChangePage("L'administration")} >L'administration</a>

                <a className={"collapse-item " + (this.props.ComponentPage === "Etudiant" ? "active" : "")}
                  onClick={() => this.props.FunNavChangePage("Etudiant")} >Etudiant</a>
              </div>
            </div>
          </li>


          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div className="sidebar-heading">
            Addons
</div>

          {/* <!-- Nav Item - Pages Collapse Menu --> */}




          <li className={"nav-item " + (this.props.ComponentPage === "Paramètres" ? "active" : "")}
            onClick={() => this.props.FunNavChangePage("Paramètres")}>
            <a className="nav-link" >
              <i className="fas fa-fw fa-cog"></i>
              <span>Paramètres</span></a>
          </li>

          <li className="nav-item " onClick={this.deconnecter}>
            <a className="nav-link">
              <i className="fas fa-fw fa-sign-out-alt"></i>
              <span>Se Déconnecter</span></a>
          </li>




          {/* <!-- Divider --> */}
          <hr className="sidebar-divider d-none d-md-block" />

          {/* <!-- Sidebar Toggler (Sidebar) --> */}
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" onClick={this.props.FunNavChaneToggled}></button>
          </div>

        </ul>
      </Fragment>
    );
  }

  render() {
    var sessionUser = JSON.parse(localStorage.getItem('user') || null);
    const { id_typeUser, typeUser } = sessionUser;
    return (
      typeUser === 'admin' ? this.componentAdmin()
        : this.componentEtudiantOuProf(id_typeUser, typeUser)
    );
  }

  deconnecter = () => {
    localStorage.removeItem('user');
    window.location.reload(false);
  }

}

export default NavLeft;
