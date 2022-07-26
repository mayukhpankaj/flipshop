//Fallback Page.
import React from "react";
import {Fade} from "reactstrap";
import img from './fallbackimage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fallbackPage.css";

const fallback = (props) => {
  return (
      <Fade in={true}>
    <div className="maintext">
      <div className="content">
        <img src={img} alt="" className="fallback"/>
      </div>
    </div>
    </Fade>
  );
};

export default fallback;