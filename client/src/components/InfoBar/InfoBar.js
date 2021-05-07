import React from 'react';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="left-inner-container">
      <div>{room}</div>
    </div>
    <div className="right-inner-container">
      <a href="/">Leave chat</a>
    </div>
  </div>
);

export default InfoBar;