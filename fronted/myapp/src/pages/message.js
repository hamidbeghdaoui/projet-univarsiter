import React, { Component, Fragment } from 'react';
class Message extends Component {
  render() {
    return (
      <Fragment>
        <div className="w-100 py-3 px-2">
          <div className="small text-gray-600 w-100">
            <div className="float-left">
              <span className="float-left btn" onClick={() => this.props.FunNavChangeBoolChate()}><i className="fas fa-arrow-left text-muted "></i></span>
              <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" width="40"
                height="40" alt="" />
              <span className="ml-2">Morgan Alvarez</span>
            </div>
            <div className="float-right mt-2 mr-2">Prof SE</div>
          </div>
        </div>

        <div className="container-fluid bg-light div-message ">
          <div className="w-100 bg-dark">
            <div className="w-50 bg-primary rounded text-left float-left mx-1 my-1">
              <p className="text-light m-1 p-message">Asm3 w9il mnzodch ndkhl l FB ksh makn contactini hna
                        Asm3 w9il mnzodch ndkhl l FB ksh makn contactini hnaAsm3 w9il mnzodch ndkhl l FB ksh makn contactini hnaAsm3 w9il mnzodch ndkhl l FB ksh makn contactini hna</p>
              <span className="date-message text-light mr-3 float-right my-1">12-06-2019 20:12</span>

            </div>
          </div>
          <div className="w-100 bg-dark">
            <div className="w-50 bg-secondary rounded text-left float-right mx-1 my-1">
              <p className="text-light m-1 p-message">Asm3 w9il mnzodch ndkhl l FB ksh makn contactini hna
                        Asm3 w9il mnzodch ndkhl l FB ksh makn contactini hnaAsm3 w9il mnzodch ndkhl l FB ksh makn contactini hnaAsm3 w9il mnzodch ndkhl l FB ksh makn contactini hna</p>
              <span className="date-message text-light mr-3 float-right my-1">12-06-2019 20:12</span>
            </div>
          </div>
          <div className="w-100 bg-dark">
            <div className="w-50 bg-secondary rounded text-left float-right mx-1 my-1">
              <div className="text-center">
                <img src="https://source.unsplash.com/AU4VPcFN4LE/60x60" className="img-fluid" alt="Responsive image" />
              </div>
              <span className="date-message text-light mr-3 float-right my-1">12-06-2019 20:12</span>
              <span className="date-message ml-3 float-left my-1  btn p-0"><i className="fas fa-download fa-sm text-white mr-2 "></i></span>
            </div>
          </div>
          <div className="w-100 bg-dark">
            <div className="w-50 bg-primary rounded text-left float-left mx-1 my-1">
              <p className="text-light m-1 p-message"><a className="text-light" href="zde" target="_blank"> https://google.com </a></p>
              <span className="date-message text-light mr-3 float-right my-1">12-06-2019 20:12</span>

            </div>
          </div>
          <div className="w-100 bg-dark">
            <div className="w-50 bg-secondary rounded text-left float-right mx-1 my-1">
              <p className="text-light m-1 p-message">Asm3 w9il mnzodch ndkhl l FB ksh makn contactini hna
                        Asm3 w9il mnzodch ndkhl l FB ksh makn contactini hnaAsm3 w9il mnzodch ndkhl l FB ksh makn contactini hnaAsm3 w9il mnzodch ndkhl l FB ksh makn contactini hna</p>
              <span className="date-message text-light mr-3 float-right my-1">12-06-2019 20:12</span>
            </div>
          </div>
          <div className="w-100 bg-dark">
            <div className="w-50 bg-secondary rounded text-left float-right mx-1 my-1">
              <p className="text-light m-1 p-message h1 mt-3 text-center">cour SE 2.pdf</p>
              <span className="date-message text-light mr-3 float-right my-1">12-06-2019 20:12</span>
              <span className="date-message ml-3 float-left my-1  btn p-0"><i className="fas fa-download fa-sm text-white mr-2 "></i></span>
            </div>
          </div>
        </div>
        <div className="row container-fluid p-0 m-auto">

          <button className="col-1 p-0 btn text-dark border-dark" >
            <label className="w-100 h-100 pt-2" htmlFor="addFile"><i className="fas fa-2x fa-file-alt"></i></label>
            <input type="file" id="addFile" hidden={true} />

          </button>
          <input className="col-9 input" type="text" placeholder="Rédiger un message ..." />
          <button className="col-2  btn text-dark border-dark"><i className="fas fa-2x fa-paper-plane"></i> Envoi</button>
        </div>
      </Fragment>
    );
  }

}

export default Message;

