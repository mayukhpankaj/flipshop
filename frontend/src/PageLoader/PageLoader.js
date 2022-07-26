import React from 'react';
import ReactDOM from 'react-dom';
import ItemLoader from './ItemLoader';
import './PageLoader.css';

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}><ItemLoader/></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;