import React from 'react';
import classNames from 'classnames';

import { TEAMS } from '../../helpers/teams';

import './teamCard.css';

class TeamCard extends React.Component {

  render() {
    let { id, away } = this.props;
    let classes = classNames({
      'team-card': true,
      'away': away
    });

    let team = TEAMS[id];

    return (
      <div className={ classes }>
        <div className='user'>{ team.user }</div>
        <div className='flag'>
          <img src={ team.flag } alt={ team.name } />
        </div>
      </div>
    );
  }
}

export default TeamCard;
