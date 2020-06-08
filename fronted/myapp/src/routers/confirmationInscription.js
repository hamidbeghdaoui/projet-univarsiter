import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./../helpers/spinner";
import Alert from "./../helpers/alert";
import HOST from "./../helpers/host";
class ConfirmationInscription extends Component {

  // ----------------------------------------- data----------------------------------------
  state = {
    POST: {
      but: 'Confirmation-Inscription',
      idTypeUser: '',
      typeUser: '',
      image: 'kjk',
      user: '',
      password: '',
      confPassword: '',
      email: '',
      Phone: ''
    },
    component: "spinner",
    error: null,
    alert: {
      color: 'warning',
      title: 'Attention',
      subject: 'Tous les champs doivent être remplis'
    }

  }

  //---------------------------------------------When the page loads----------------------------------------
  componentDidMount() {
    this.IsSessionExist();
  }

  //---------------------------------------------contact server----------------------------------------
  handleSubmit = e => {
    e.preventDefault();
    const { but, user, password, confPassword, email, Phone } = this.state.POST;
    if (but && user.trim() && password && confPassword && email && Phone) {
      if (confPassword != password) {
        this.setState({
          error: 'confirmationPassword',
          alert: {
            color: 'info',
            title: 'Erreur',
            subject: 'Erreur lors de la confirmation du mot de passe',
          }
        });
      } else {
        this.setState({
          component: "spinner"
        });
        if (this.state.POST.image) {
          // --------------------------------- Download the image and return name Image ----------------------
          const API_PATH =  HOST + "/project/backend/ajax/UploadFile.php";
          const fd = new FormData();
          fd.append('imageUser', this.state.POST.image);

          axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'multipart/form-data' },
            data: fd,

          })
            .then(result => {
              console.log(result.data);
              // -----------------Edit information ---------------------
              this.funAxios(result.data);


            })
            .catch(error => this.setState({ error: error.message }));
          // --------------------------------- end Download the image ----------------------

        } else {
          // -----------------Edit information ---------------------
          this.funAxios("");
        }

      }
    } else {
      this.setState({
        error: 'videInput',
        alert: {
          color: 'warning',
          title: 'Attention',
          subject: 'Tous les champs doivent être remplis',
        }
      });
    }


  }

  funAxios = (image) => {
    const API_PATH =  HOST + "/project/backend/ajax/user.php";
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: {
        but: 'Confirmation-Inscription',
        idTypeUser: this.state.POST.idTypeUser,
        typeUser: this.state.POST.typeUser,
        image: image,
        user: this.state.POST.user,
        password: this.state.POST.password,
        email: this.state.POST.email,
        Phone: this.state.POST.Phone
      }
    })
      .then(result => {
        if (result.data.addUser && result.data.updateTypeUser) {
          document.getElementById("Login").click();
        } else {
          this.setState({
            error: 'Erreur',
            alert: {
              color: 'info',
              title: 'Erreur',
              subject: "Une erreur s'est produite, veuillez réessayer",
            }
          });
        }
      })
      .catch(error => this.setState({ error: error.message }));
  }

  IsSessionExist = () => {
    //
    var sessionIsInscription = JSON.parse(localStorage.getItem('isInscription') || null);
    if (sessionIsInscription != null) {
      const { idTypeUser, typeUser } = sessionIsInscription;
      this.setState({
        POST: {
          but: 'Confirmation-Inscription',
          idTypeUser: idTypeUser,
          typeUser: typeUser,
          image: '',
          user: '',
          password: '',
          confPassword: '',
          email: '',
          Phone: ''
        },
        component: "Confirmation-Inscription",
      });
      localStorage.removeItem('isInscription');
    } else {
      document.getElementById("inscription").click();
    }
  }


  // -------------------------------------------- Content ------------------------------------------
  ComponentInscription = () => {
    return (
      <Fragment>
        {(this.state.error === null) ? "" : <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} />}
        <form id="form">
          <div className=" bg-projet mt-5 mx-auto container-sm p-5">
            <h3 className="pb-5 text-center text-primary">Ajouter des informations</h3>
            <label htmlFor="file" className="btn bg-success w-100 text-light">une photo personnelle </label>
            <input type="file" name="image" onChange={this.funChangeValueInputImage} id="file" accept="image/*" hidden={true} />
            <input type="text" name="user" onChange={this.funChangeValueInputUserName} className="w-100 text-center mt-2 form-control" placeholder="Nom d'utilisateur *" />
            <input type="password" onChange={this.funChangeValueInputPassword} className="w-100 text-center mt-2 form-control" placeholder="Mot de passe *" />
            <input type="password" onChange={this.funChangeValueInputConfPassword} className="w-100 text-center mt-2 form-control" placeholder="Confirmation mot de passe *" />
            <input type="email" onChange={this.funChangeValueInputEmail} className="w-100 text-center mt-2 form-control" placeholder="Email *" />
            <input type="number" onChange={this.funChangeValueInputPhone} className="w-100 text-center mt-2 form-control" placeholder="Phone *" />
            <button className="btn  bg-success w-100 text-light mt-5" onClick={this.handleSubmit}>Confirmé</button>
          </div>
        </form>
      </Fragment>
    );
  }

  // -------------------------------------------- render ------------------------------------------
  render() {
    return (
      <Fragment>
        {
          (this.state.component === "Confirmation-Inscription") ? this.ComponentInscription() : <Spinner />
        }
        <Link className='btn bg-success px-5 text-light' id="Login" to='/Login/' hidden></Link>
        <Link className='btn bg-success px-5 text-light' id="inscription" to='/inscription/' hidden></Link>

      </Fragment>
    );

  }

  // -------------------------------------------- function ------------------------------------------
  funChangeValueInputImage = e => {
    try {
      this.setState({
        POST: {
          but: 'Confirmation-Inscription',
          idTypeUser: this.state.POST.idTypeUser,
          typeUser: this.state.POST.typeUser,
          image: e.target.files[0],
          user: this.state.POST.user,
          password: this.state.POST.password,
          confPassword: this.state.POST.confPassword,
          email: this.state.POST.email,
          Phone: this.state.POST.Phone
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  funChangeValueInputUserName = e => {
    this.setState({
      POST: {
        but: 'Confirmation-Inscription',
        idTypeUser: this.state.POST.idTypeUser,
        typeUser: this.state.POST.typeUser,
        image: this.state.POST.image,
        user: e.target.value,
        password: this.state.POST.password,
        confPassword: this.state.POST.confPassword,
        email: this.state.POST.email,
        Phone: this.state.POST.Phone
      },
    });
  }

  funChangeValueInputPassword = e => {
    this.setState({
      POST: {
        but: 'Confirmation-Inscription',
        idTypeUser: this.state.POST.idTypeUser,
        typeUser: this.state.POST.typeUser,
        image: this.state.POST.image,
        user: this.state.POST.user,
        password: e.target.value,
        confPassword: this.state.POST.confPassword,
        email: this.state.POST.email,
        Phone: this.state.POST.Phone
      },
    });
  }

  funChangeValueInputConfPassword = e => {
    this.setState({
      POST: {
        but: 'Confirmation-Inscription',
        idTypeUser: this.state.POST.idTypeUser,
        typeUser: this.state.POST.typeUser,
        image: this.state.POST.image,
        user: this.state.POST.user,
        password: this.state.POST.password,
        confPassword: e.target.value,
        email: this.state.POST.email,
        Phone: this.state.POST.Phone
      },
    });
  }

  funChangeValueInputEmail = e => {
    this.setState({
      POST: {
        but: 'Confirmation-Inscription',
        idTypeUser: this.state.POST.idTypeUser,
        typeUser: this.state.POST.typeUser,
        image: this.state.POST.image,
        user: this.state.POST.user,
        password: this.state.POST.password,
        confPassword: this.state.POST.confPassword,
        email: e.target.value,
        Phone: this.state.POST.Phone
      },
    });
  }

  funChangeValueInputPhone = e => {
    this.setState({
      POST: {
        but: 'Confirmation-Inscription',
        idTypeUser: this.state.POST.idTypeUser,
        typeUser: this.state.POST.typeUser,
        image: this.state.POST.image,
        user: this.state.POST.user,
        password: this.state.POST.password,
        confPassword: this.state.POST.confPassword,
        email: this.state.POST.email,
        Phone: e.target.value
      },
    });
  }

  // -------------------------------- Alert -----------------------------------------
  funHidenAlert = () => {
    this.setState({
      error: null,
    });
  }




}

export default ConfirmationInscription;