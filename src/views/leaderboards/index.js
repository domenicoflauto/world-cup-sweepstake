import React from 'react';

import './leaderboards.css';

import Dirtiest from './components/dirtiest';

class Leaderboards extends React.Component {

  render() {
    return (
      <div className="Leaderboards-view">
        Leaderboards
        <div className="leaderboards-wrapper">
          <Dirtiest />
          <Dirtiest />
          <Dirtiest />
          <Dirtiest />
          <Dirtiest />
          <Dirtiest />
        </div>
      </div>
    );
  }
}

export default Leaderboards;
