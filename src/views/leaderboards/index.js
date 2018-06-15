import React from 'react';

import './leaderboards.css';
import * as stats from '../../helpers/stats';

import Dirtiest from './components/dirtiest';
import LeaderBoard from '../../components/leaderBoard';

class Leaderboards extends React.Component {

  render() {
    return (
      <div className="Leaderboards-view">
        Leaderboards
        <div className="leaderboards-wrapper">
          <LeaderBoard
            name='Biggest Hammering'
            standings={stats.getBiggestLosses(this.props.matches)}
          />

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
