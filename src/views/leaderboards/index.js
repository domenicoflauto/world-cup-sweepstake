import React from 'react';

import './leaderboards.css';
import * as stats from '../../helpers/stats';

import Placeholder from './components/placeholder';
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
          <LeaderBoard
            name='Shittiest team'
            standings={stats.getWorstTeams(this.props.results)}
          />
          <Placeholder
            name='Winner'
          />
          <Placeholder
            name='Furthest out screamer'
          />

        </div>
      </div>
    );
  }
}

export default Leaderboards;
