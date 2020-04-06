import React, { Component, Fragment } from 'react';
import axios from "axios";
import TypeFilePosible from "./../helpers/typeFilePosible";
import ValidURL from "./../helpers/validURL";
import Alert from "./../helpers/alert";
import ItemMessageChate from "./../components/itemMessageChate";
class Message extends Component {


  // ----------------------------------------- data----------------------------------------
  state = {
    POST: {
      but: 'send-message',
      message: '',
      typeMessage: 'text',
      file: ''
    },
    error: null,
    alert: {
      color: 'warning',
      title: 'REMARQUE',
      subject: 'Ce type de fichier ne peut pas être envoyé',

    },
    stopConactedServer: false,
    messageChate: []

  }

  //---------------------------------------------When the page loads----------------------------------------
  componentDidMount() {
    this.getMessageEnvoyeRecepteur();
  }

  //---------------------------------------------contact server----------------------------------------
  getMessageEnvoyeRecepteur = async () => {
    const API_PATH = "http://127.0.0.1/project/backend/ajax/message.php";
    var sessionUser = JSON.parse(localStorage.getItem('user') || null);
    for (; ;) {
      if (this.state.stopConactedServer) break;
      await this.sleep(1000);
      axios({
        method: 'post',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        data: {
          but: 'get-message-EnvoyeRecepteur',
          id_userEnvoye: this.props.itemMessage.idUser,
          id_userRecepteur: sessionUser.id,
        }
      })
        .then(result => {
          if (JSON.stringify(result.data) != JSON.stringify(this.state.messageChate)) {
            this.setState({
              messageChate: result.data
            });
            this.funScorllBottom();
          }
        })
        .catch(error => this.setState({ error: error.message }));
    }
  };

  sendMessage = e => {
    e.preventDefault();
    if (this.state.POST.message.trim()) {

      this.setState({
        component: "spinner"
      });

      if (this.state.POST.file) {
        // --------------------------------- Download the image and return name Image ----------------------
        const API_PATH = "http://127.0.0.1/project/backend/ajax/UploadFile.php";
        const fd = new FormData();
        fd.append('fileChate', this.state.POST.file);

        axios({
          method: 'post',
          url: `${API_PATH}`,
          headers: { 'content-type': 'multipart/form-data' },
          data: fd,

        })
          .then(result => {
            console.log(result.data);
            // -----------------Edit information ---------------------
            if(result.data != false){
               this.funAxios(result.data , this.state.POST.typeMessage);
            }else{
                this.setState({
                  error: "error",
                  alert: {
                    color: 'danger',
                    title: 'ERREUR',
                    subject: "Une erreur s'est produite lors de l'envoi du fichier",
              
                  }
                });
            }
            


          })
          .catch(error => this.setState({ error: error.message }));
        // --------------------------------- end Download the image ----------------------

      } else {
        // -----------------Edit information ---------------------
        this.funAxios(this.state.POST.message, this.state.POST.typeMessage);
      }

    }

  }

  funAxios = (message, type) => {
    const API_PATH = "http://127.0.0.1/project/backend/ajax/message.php";
    var sessionUser = JSON.parse(localStorage.getItem('user') || null);
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: {
        but: 'send-message',
        message: message,
        typeMessage: type,
        id_userEnvoye: sessionUser.id,
        id_userRecepteur: this.props.itemMessage.idUser,
      }
    })
      .then(result => {
        console.log(result.data);
        this.setState({
          POST: {
            but: 'send-message',
            message: '',
            typeMessage: 'text',
            file: ''
          }
        });

      })
      .catch(error => this.setState({ error: error.message }));
  }


  // -------------------------------------------- render ------------------------------------------
  render() {
    return (
      <Fragment>
        {this.state.error != null ? <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} /> : ""}
        <div className="w-100 py-3 px-2">
          <div className="small text-gray-600 w-100">
            <div className="float-left">
              <span className="float-left btn" onClick={this.funStopConactedServer}><i className="fas fa-arrow-left text-muted "></i></span>
              {(this.props.itemMessage.image != null) ? <img className="img-profile rounded-circle" src={"http://127.0.0.1/project/backend/file/user/" + this.props.itemMessage.image} width="40" height="40" /> :
                <span className="imageUserChate float-left">
                  {this.props.itemMessage.prenom.charAt(0).toUpperCase()}
                </span>
              }
              <span className="ml-2 float-right  mt-2">{this.props.itemMessage.prenom + " " + this.props.itemMessage.nom}</span>
            </div>
            <div className="float-right mt-2 mr-2">{this.props.itemMessage.typeUser}</div>
          </div>
        </div>

        <div id="div-chate" className="container-fluid bg-white div-message ">
          {this.state.messageChate.length != 0 ?
            <ItemMessageChate messageChate={this.state.messageChate} />
            : <div className="text-center mt-5 pt-5 text-muted"> No message</div>
          }
        </div>
        <div className="row container-fluid p-0 m-auto">
          <button className="col-2 p-0 btn text-dark border-dark" >
            <label className="w-100 h-100 pt-2 px-2" htmlFor="addFile">ficher</label>
            <input type="file" onChange={this.funChangeInputFile} id="addFile" hidden={true} />

          </button>
          {
            (this.state.POST.file)
              ?
              <Fragment>
                <input className="col-6 input" type="text" disabled value={this.state.POST.file.name} placeholder="Rédiger un message ..." onChange={this.funChangeInputSendMessage} />
                <button className="col-2  btn text-light btn-danger" onClick={this.funAnnlerSendFile}>Annuler</button>
                <button className="col-2  btn text-light btn-success" onClick={this.sendMessage}>Envoi</button>
              </Fragment>
              :
              <Fragment>
                <input className="col-8 input" type="text" onKeyDown={this.FunEventEnterSendMessage} value={this.state.POST.message} placeholder="Rédiger un message ..." onChange={this.funChangeInputSendMessage} />
                <button className="col-2  btn text-light  btn-success" onClick={this.sendMessage}>Envoi</button>
              </Fragment>

          }

        </div>
      </Fragment>
    );
  }

  // -------------------------------------------- function ------------------------------------------
  FunEventEnterSendMessage = e => {
    if (e.key === 'Enter') {
      this.sendMessage(e);
    }
  }

  funChangeInputFile = e => {

    try {
      if (TypeFilePosible(e.target.files[0].type ,'file')) {
        this.setState({
          POST: {
            but: 'send-message',
            message: e.target.value,
            typeMessage: e.target.files[0].type,
            file: e.target.files[0]
          },
          error: null
        });
      } else {
        this.setState({
          error: 'fileError'
        });
      }
    } catch (error) {
      console.log(error);
    }

  }

  funAnnlerSendFile = () => {
    this.setState({
      POST: {
        but: 'send-message',
        message: '',
        typeMessage: 'text',
        file: ''
      }
    });
  }

  funChangeInputSendMessage = e => {
    let typeMessage ='text';
    if(ValidURL(e.target.value)) typeMessage = 'line';
    this.setState({
      POST: {
        but: 'send-message',
        message: e.target.value,
        typeMessage: typeMessage,
        file: ''
      }
    });
  }

  funStopConactedServer = async () => {
    this.setState({
      stopConactedServer: true,
    });
   await this.sleep(10) ;
    this.props.FunNavChangeBoolChate();
  }

  funScorllBottom = () => {
    var divChate = document.getElementById("div-chate");
    divChate.scrollTop = divChate.scrollHeight;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // -------------------------------- Alert -----------------------------------------
  funHidenAlert = () => {
    this.setState({
      error: null,
    });
  }




}

export default Message;

