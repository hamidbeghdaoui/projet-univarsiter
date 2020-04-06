import React, { Fragment, Component } from 'react';
import axios from "axios";
import TypeFilePosible from "./../helpers/typeFilePosible";
import ValidURL from "./../helpers/validURL";
import Spinner from "./../helpers/spinner";
import Alert from "./../helpers/alert";

class AjouterPublication extends Component {


    // ----------------------------------------- data----------------------------------------
    state = {
        POST: {
            but: 'publication-Etudiant',
            post: '',
            file: '',
            typeFile: '',
            line: '',
            typePublication: 'spécialité',
        },
        component: "Ajouter Publication",
        error: null,
        alert: {
            color: 'warning',
            title: 'REMARQUE',
            subject: 'Ce type de fichier ne peut pas être envoyé',
        },
        colorInputLine: "info"

    }

    //---------------------------------------------contact server----------------------------------------
    AjouterPublication = e => {
        e.preventDefault();
        if (this.state.POST.post.trim() && this.state.POST.typePublication.trim()) {

            this.setState({
                component: "spinner"
            });

            if (this.state.POST.file) {
                // --------------------------------- Download the image and return name Image ----------------------
                const API_PATH = "http://127.0.0.1/project/backend/ajax/UploadFile.php";
                const fd = new FormData();
                fd.append('filePublication', this.state.POST.file);

                axios({
                    method: 'post',
                    url: `${API_PATH}`,
                    headers: { 'content-type': 'multipart/form-data' },
                    data: fd,

                })
                    .then(result => {
                        console.log(result.data);
                        // -----------------Edit information ---------------------
                        if (result.data != false) {
                            this.funAxios(result.data, this.state.POST.typeFile);
                        } else {
                            this.setState({
                                error: "error",
                                alert: {
                                    color: 'danger',
                                    title: 'ERREUR',
                                    subject: "Une erreur s'est produite lors de l'envoi du fichier",
                                },
                                component: "Ajouter Publication"
                            });
                        }



                    })
                    .catch(error => this.setState({ error: error.message }));
                // --------------------------------- end Download the image ----------------------

            } else {
                // -----------------Edit information ---------------------
                if (this.state.POST.line) {
                    this.funAxios(this.state.POST.line, this.state.POST.typeFile);
                } else {
                    this.funAxios("", "");
                }
            }

        }

    }

    funAxios = (Content, TypeContent) => {
        const API_PATH = "http://127.0.0.1/project/backend/ajax/etudiant.php";
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        // console.log(sessionUser);
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: {
                but: 'publication-Etudiant',
                idUser: sessionUser.id,
                id_typeUser :sessionUser.id_typeUser,
                post: this.state.POST.post,
                file: Content,
                typeFile: TypeContent,
                typePublication: this.state.POST.typePublication,
            }
        })
            .then(result => {
                console.log(result.data);
                if (result.data) {
                    this.setState({
                        POST: {
                            but: 'publication-Etudiant',
                            post: '',
                            file: '',
                            typeFile: '',
                            line: '',
                            typePublication: 'spécialité',
                        },
                        error: "Resalt",
                        alert: {
                            color: 'success',
                            title: 'Resalt',
                            subject: "Le poste a été publié",
                        },
                        colorInputLine: "info",
                        component: "Ajouter Publication"
                    });
                } else {

                }

            })
            .catch(error => this.setState({ error: error.message }));
    }

    // -------------------------------------------- Content ------------------------------------------
    ComponentEtudiant = () => {
        return (
            <Fragment>
                <div className="m-2">
                    <form>
                        <div className="form-group">
                            <label htmlFor="Textarea1" className="ml-1">J'écris le post *</label>
                            <textarea className="form-control" id="Textarea1" rows="3" onChange={this.funChangeInputPost}></textarea>
                        </div>
                        <hr className="sidebar-divider mx-5" />
                        <div className="form-group text-center">
                            {
                                (this.state.POST.file.length === 0) ?
                                    <Fragment>
                                        <label htmlFor="file1" className="btn btn-dark" >Ajouter un fichier</label>
                                        <input type="file" className="form-control" id="file1" disabled={this.state.colorInputLine === 'success' ? true : false} onChange={this.funChangeInputFile} hidden={true} />
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <div className="row text-center px-5">
                                            <input type="text" className="col-8 form-control border-dark" value={this.state.POST.file.name} disabled />
                                            <button className="col-4 btn btn-danger" onClick={this.funAnnlerPubFile}>Annuler</button>
                                        </div>
                                    </Fragment>

                            }
                        </div>
                        <h4 className="text-muted text-center">OU</h4>
                        <div className="form-group">
                            <label htmlFor="text1" className="ml-1">Ajouter un Line</label>
                            <input type="text" className={"form-control border-" + this.state.colorInputLine} value={this.state.POST.line} onChange={this.funChangeInputLine}
                                disabled={this.state.POST.file ? true : false} id="tewt1" />
                        </div>
                        <hr className="sidebar-divider mx-5" />
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-secondary" type="button">type Publiction</button>
                            </div>
                            <select className="custom-select" id="inputGroupSelect03" aria-label="Example select with button addon"
                                value={this.state.POST.typePublication} onChange={this.funChangeInputTypePub} >
                                <option value="spécialité" >Visible dans ma spécialité</option>
                                <option value="section">Visible dans mon section</option>
                                <option value="group">Visible dans mon group</option>
                            </select>
                        </div>
                        <div className="text-center mt-5">
                            <button type="submit" className="btn btn-primary px-4 mx-auto" onClick={this.AjouterPublication}>Publié</button>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }

    ComponentProf = () => {
        return (
            <Fragment></Fragment>
        );
    }
    ComponentMain = () => {
        var sessionUser = JSON.parse(localStorage.getItem('user') || null);
        return (
            <Fragment>
                {(this.state.error === null) ? "" : <Alert alert={this.state.alert} funHidenAlert={this.funHidenAlert} />}
                {sessionUser.typeUser === 'etudiant' ? this.ComponentEtudiant() : this.ComponentProf()}
            </Fragment>
        );
    }

    // -------------------------------------------- render ------------------------------------------
    render() {
        return (
            <Fragment>
                {(this.state.component === "Ajouter Publication") ? this.ComponentMain() : <Spinner />}
            </Fragment>
        );

    }

    // -------------------------------------------- function ------------------------------------------
    funChangeInputPost = e => {
        this.setState({
            POST: {
                post: e.target.value,
                file: this.state.POST.file,
                typeFile: this.state.POST.typeFile,
                line: this.state.POST.line,
                typePublication: this.state.POST.typePublication,
            }
        });
    }

    funChangeInputFile = e => {
        try {
            if (TypeFilePosible(e.target.files[0].type, 'file')) {
                this.setState({
                    POST: {
                        post: this.state.POST.post,
                        file: e.target.files[0],
                        typeFile: e.target.files[0].type,
                        line: this.state.POST.line,
                        typePublication: this.state.POST.typePublication,
                    },
                    colorInputLine: 'dark'
                });
            } else {
                this.setState({
                    error: 'fileError',
                    alert: {
                        color: 'warning',
                        title: 'REMARQUE',
                        subject: 'Ce type de fichier ne peut pas être envoyé',
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }

    }

    funChangeInputLine = e => {
        console.log(ValidURL(e.target.value));
        if (ValidURL(e.target.value)) {
            this.setState({
                POST: {
                    post: this.state.POST.post,
                    file: this.state.POST.file,
                    typeFile: 'line',
                    line: e.target.value,
                    typePublication: this.state.POST.typePublication,
                },
                colorInputLine: 'success'
            });
        } else {
            this.setState({
                POST: {
                    post: this.state.POST.post,
                    file: this.state.POST.file,
                    typeFile: this.state.POST.typeFile,
                    line: '',
                    typePublication: this.state.POST.typePublication,
                },
                colorInputLine: 'info'

            });

        }

    }

    funChangeInputTypePub = e => {
        this.setState({
            POST: {
                post: this.state.POST.post,
                file: this.state.POST.file,
                typeFile: this.state.POST.typeFile,
                line: this.state.POST.line,
                typePublication: e.target.value,
            }
        });
    }


    funAnnlerPubFile = () => {
        this.setState({
            POST: {
                post: this.state.POST.post,
                file: '',
                typeFile: '',
                line: this.state.POST.line,
                typePublication: this.state.POST.typePublication,
            }
        });
    }
    funAnnlerPubLine = () => {
        this.setState({
            POST: {
                post: this.state.POST.post,
                file: this.state.POST.file,
                typeFile: '',
                line: '',
                typePublication: this.state.POST.typePublication,
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

export default AjouterPublication;