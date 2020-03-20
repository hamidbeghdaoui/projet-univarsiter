import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import "./../css/ER.css";


const ER = (props) => {

  return (
    <Fragment>

      <div className='dc hyujk'>
        <div className='d_404'>404</div>
        <div className='d_1'>THE PAGE</div>
        <div className='d_2'>WAS NOT FOUND</div>
        <Link className='Dbtn cbghj ' to='/'>BACK TO MARS</Link>
      </div>
    </Fragment>
  );

}

export default ER;
