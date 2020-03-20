import React, { Fragment } from 'react';


const AjouterPublication = (props) => {
    return (
        <Fragment>
            <div className="m-2">
                <form>
                    <div className="form-group">
                        <label htmlFor="Textarea1" className="ml-1">J'écris le post *</label>
                        <textarea className="form-control" id="Textarea1" rows="3"></textarea>
                    </div>
                    <hr className="sidebar-divider mx-5" />
                    <div className="form-group text-center">
                        <label htmlFor="file1" className="btn btn-dark">Ajouter un fichier</label>
                        <input type="file" className="form-control" id="file1" hidden={true} />
                    </div>
                    <h4 className="text-muted text-center">OU</h4>
                    <div className="form-group">
                        <label htmlFor="text1" className="ml-1">Ajouter un Line</label>
                        <input type="text" className="form-control" id="tewt1" />
                    </div>
                    <hr className="sidebar-divider mx-5" />
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-secondary" type="button">type Publiction</button>
                        </div>
                        <select className="custom-select" id="inputGroupSelect03" aria-label="Example select with button addon">
                            <option >Visible dans ma spécialité</option>
                            <option defaultValue="1">Visible dans mon section</option>
                            <option defaultValue="2">Visible dans mon group</option>
                        </select>
                    </div>
                    <div className="text-center mt-5">
                        <button type="submit" className="btn btn-primary px-4 mx-auto">Publié</button>
                    </div>
                </form>
            </div>

        </Fragment>
    );

}

export default AjouterPublication;