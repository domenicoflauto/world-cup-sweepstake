import React from 'react';

import './leaderboards.css';
import * as stats from '../../helpers/stats';

import Dirtiest from './components/dirtiest';
import LeaderBoard from '../../components/leaderBoard';

class Leaderboards extends React.Component {

  render() {
    return (
      <div className="Leaderboards-view">
        <div className="leaderboards-wrapper">
          <LeaderBoard
            name='Biggest Hammering'
            standings={stats.getBiggestLosses(this.props.matches)}
          />
          <LeaderBoard
            name='Dirtiest Teams'
            standings={stats.rankDirtiestTeams(this.props.matches)}
         />
          <LeaderBoard
            name='Fastest goal'
            standings={stats.getFastestGoals(this.props.matches)}
          />
        </div>
      </div>
    );
  }
}

export default Leaderboards;
