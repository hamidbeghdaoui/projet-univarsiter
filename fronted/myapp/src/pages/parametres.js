import React, { Fragment, Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "./../helpers/spinner";
import Alert from "./../helpers/alert";
import HOST from "./../helpers/host";
class Parametres extends Component {
  // ----------------------------------------- data----------------------------------------
  state = {
    component: "spinner",
    error: null,
    POST1: {
      but: 'parametre-info',
      id_user: '',
      image: '',
      email: '',
      phone: ''
    },
    POST2: {
      but: 'parametre-saisie',
      id_user: '',
      username: '',
      passwordN: '',
      configPasswordN: '',
      Password: '',
    },
    info: [],
    error: null,
    alertShow: '',
    alert: {
      color: 'warning',
      title: 'Attention',
      subject: 'Tous les champs doivent être remplis',
    }

  }

  //---------------------------------------------When the page loads----------------------------------------
  componentDidMount() {
    this.getinfo();
  }

  //---------------------------------------------contact server----------------------------------------
  getinfo = () => {
    const API_PATH =  HOST + "/project/backend/ajax/user.php";
    var sessionUser = JSON.parse(localStorage.getItem('user') || null);
    console.log(sessionUser);
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: {
        but: 'get-ALL-Information-User',
        idTypeUser: sessionUser.id_typeUser,
        typeUser: sessionUser.typeUser,
      },
    })
      .then(result => {

        if (result.data != false) {
          const info = result.data
          this.setState({
            component: "parametre",
            POST1: {
              but: 'parametre-info',
              id_user: sessionUser.id,
              image: '',
              email: info.email,
              phone: info.phone,
            },
            POST2: {
              but: 'parametre-saisie',
              id_user: sessionUser.id,
              username: info.userName,
              passwordN: '',
              configPasswordN: '',
              Password: '',
            },
          });
          console.log(result.data);
        } else {
          this.setState({
            error: 'ErrorInServer',
            alert: {
              color: 'warning',
              title: 'Error',
              subject: 'Tous les champs doivent être remplis',
            }
          });
        }
      })
      .catch(error => this.setState({ error: error.message }));
  }


  handleSubmitPOST1 = e => {
    e.preventDefault();
    const { email, phone, image } = this.state.POST1;

    if (email && phone) {
      if (image) {
        // --------------------------------- Download the image and return name Image ----------------------
        const API_PATH =  HOST + "/project/backend/ajax/UploadFile.php";
        const fd = new FormData();
        fd.append('imageUser', image);
        axios({
          method: 'post',
          url: `${API_PATH}`,
          headers: { 'content-type': 'multipart/form-data' },
          data: fd,

        })
          .then(result => {
            // console.log("result.data");
            // -----------------Edit information ---------------------
            this.funAxios(result.data);


          })
          .catch(error => this.setState({ error: error.message }));
        // --------------------------------- end Download the image ----------------------

      } else {
        // -----------------Edit information ---------------------
        this.funAxios("");

      }


    } else {
      this.setState({
        error: 'videInput',
        alertShow: 'POST1',
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
        but: this.state.POST1.but,
        id_user: this.state.POST1.id_user,
        image: image,
        email: this.state.POST1.email,
        phone: this.state.POST1.phone
      }
    })
      .then(result => {
        console.log(result.data);
        if (result.data) {
          this.setState({
            error: "Resalt",
            alertShow: 'POST1',
            alert: {
              color: 'success',
              title: 'Resalt',
              subject: "Vos informations ont été modifiées",
            },
          });
          window.location.reload(false);
        }
      })
      .catch(error => this.setState({ error: error.message }));
  }

  handleSubmitPOST2 = e => {
    e.preventDefault();
    const { username, passwordN, configPasswordN, Password } = this.state.POST2;
    if (username && passwordN && configPasswordN && Password) {
      if (configPasswordN != passwordN) {
        this.setState({
          error: 'confirmationPassword',
          alertShow: 'POST2',
          alert: {
            color: 'info',
            title: 'Erreur',
            subject: 'Erreur lors de la confirmation du mot de passe',
          }
        });
      } else {
        const API_PATH =  HOST + "/project/backend/ajax/user.php";
        axios({
          method: 'post',
          url: `${API_PATH}`,
          headers: { 'content-type': 'application/json' },
          data: this.state.POST2
        })
          .then(result => {
            console.log(result.data);
            if (result.data) {
              localStorage.removeItem('user');
              window.location.reload(false);
              // document.getElementById("retursLogin").click();
            } else {
              this.setState({
                error: 'Erreur',
                alertShow: 'POST2',
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
    } else {
      this.setState({
        error: 'videInput',
        alertShow: 'POST2',
        alert: {
          color: 'warning',
          title: 'Attention',
          subject: 'Tous les champs doivent être remplis',
        }
      });
    }

  }




  // -------------------------------------------- Content ------------------------------------------
  ComponentMain = () => {
    return (
      <Fragment>
        <div className=" bg-projet mt-5 mx-auto container-sm p-5">
          <h3 className="pb-5 text-center text-primary">Changement d'informations</h3>
          {
            this.state.alertShow === "POST1" && this.state.error != null ?
              <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} /> : ""
          }
          <div className="text-center">
            <label htmlFor="file" className="btn bg-info text-light w-100 mt-5 mb-3">Changement une photo personnelle </label>
            <input type="file" id="file"
              onChange={this.funChangeInputImage} hidden />
          </div>
          <label>Email *</label>
          <input type="email" className="w-100 text-center mb-3 form-control" value={this.state.POST1.email}
            onChange={this.funChangeInputEmail} />

          <label>Phone *</label>
          <input type="number" className="w-100 text-center mb-3 form-control" value={this.state.POST1.phone}
            onChange={this.funChangeInputPhone} />
          <a className="btn  bg-success w-100 text-light mt-5" onClick={this.handleSubmitPOST1} >Confirmé</a>


        </div>
        <div className=" bg-projet mt-5 mx-auto container-sm p-5">
          <h3 className="pb-5 text-center text-primary">Changer la méthode de saisie</h3>
          {
            this.state.alertShow === "POST2" && this.state.error != null ?
              <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} /> : ""
          }
          <label>Nom d'utilisateur *</label>
          <input type="text" className="w-100 text-center mb-3 form-control" value={this.state.POST2.username}
            onChange={this.funChangeInputUserName} />

          <label>Le nouveau mot de passe *</label>
          <input type="password" className="w-100 text-center mb-3 form-control"
            onChange={this.funChangeInputPasswordN} />

          <label>Confirmation le nouveau mot de passe *</label>
          <input type="password" className="w-100 text-center mb-3 form-control"
            onChange={this.funChangeInputConfigPasswordN} />

          <label>Ancien mot de passe *</label>
          <input type="password" className="w-100 text-center mb-3 form-control"
            onChange={this.funChangeInputPassword} />
          <a className="btn  bg-success w-100 text-light mt-5" onClick={this.handleSubmitPOST2} >Confirmé</a>


        </div>
      </Fragment>
    );
  }

  // -------------------------------------------- render ------------------------------------------

  render() {
    return (
      <Fragment>
        {this.state.component === 'parametre' ? this.ComponentMain() : <Spinner />}
        <Link className='btn bg-success px-5 text-light' id="retursLogin" to='/login/' hidden></Link>
      </Fragment>
    );

  }
  // -------------------------- function ---------------------------------- 

  funChangeInputUserName = (e) => {
    this.setState({
      POST2: {
        but: this.state.POST2.but,
        id_user: this.state.POST2.id_user,
        username: e.target.value.trim(),
        passwordN: this.state.POST2.passwordN,
        configPasswordN: this.state.POST2.configPasswordN,
        Password: this.state.POST2.Password,
      }
    });
  }

  funChangeInputPassword = (e) => {
    this.setState({
      POST2: {
        but: this.state.POST2.but,
        id_user: this.state.POST2.id_user,
        username: this.state.POST2.username,
        passwordN: this.state.POST2.passwordN,
        configPasswordN: this.state.POST2.configPasswordN,
        Password: e.target.value,
      }
    });
  }

  funChangeInputPasswordN = (e) => {
    this.setState({
      POST2: {
        but: this.state.POST2.but,
        id_user: this.state.POST2.id_user,
        username: this.state.POST2.username,
        passwordN: e.target.value,
        configPasswordN: this.state.POST2.configPasswordN,
        Password: this.state.POST2.Password,
      }
    });
  }

  funChangeInputConfigPasswordN = (e) => {
    this.setState({
      POST2: {
        but: this.state.POST2.but,
        id_user: this.state.POST2.id_user,
        username: this.state.POST2.username,
        passwordN: this.state.POST2.passwordN,
        configPasswordN: e.target.value,
        Password: this.state.POST2.Password,
      }

    });
  }

  funChangeInputImage = (e) => {
    try {
      this.setState({
        POST1: {
          but: this.state.POST1.but,
          id_user: this.state.POST1.id_user,
          image: e.target.files[0],
          email: this.state.POST1.email,
          phone: this.state.POST1.phone
        }
      });
    } catch (error) {

    }
  }

  funChangeInputEmail = (e) => {
    this.setState({
      POST1: {
        but: this.state.POST1.but,
        id_user: this.state.POST1.id_user,
        image: this.state.POST1.image,
        email: e.target.value,
        phone: this.state.POST1.phone
      }
    });
  }

  funChangeInputPhone = (e) => {
    this.setState({
      POST1: {
        but: this.state.POST1.but,
        id_user: this.state.POST1.id_user,
        image: this.state.POST1.image,
        email: this.state.POST1.email,
        phone: e.target.value
      }
    });
  }
  // -------------------------------- Alert -----------------------------------------
  funHidenAlert = () => {
    this.setState({
      error: null,
    });
  }

}

export default Parametres;