import React from 'react';

import './Header.css';

import logo from '../../logo.png';
import eigenLogo from '../../eigen-logo.png';
import title from '../../title.svg';


class Header extends React.Component {

  render() {
    return (
      <div className="Header">
        <div className="inner-header">
          <div className="logos">
            <img src={logo} className="logo" alt="fifa-logo"/>
            <img src={eigenLogo} className="eigen-logo" alt="eigen-logo"/>
          </div>
          <div className="">
            <img src={title} alt="world cup sweepstake board" className="title" />
          </div>
        {/* <div className="last-next-match">
          last match:
          <br />
          next match:
        </div> */}
        </div>
      </div>
    );
  }
}

export default Header;
