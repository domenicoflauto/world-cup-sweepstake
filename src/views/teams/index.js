import React from 'react';

import TeamCard from '../../components/teamCard';
import { TEAMS } from '../../helpers/teams';

import './teams.css';

class Teams extends React.Component {

  render() {
    return (
      <div className="teams-view">
        <div className='teams-grid'>
        { Object.keys(TEAMS).sort().map(teamId =>
            <TeamCard key={`team-${teamId}`} id={ teamId } away={ true } />
        )}
        </div>
      </div>
    );
  }
}

export default Teams;
