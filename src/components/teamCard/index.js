import React from 'react';
import classNames from 'classnames';

import { TEAMS } from '../../helpers/teams';

import './teamCard.css';

class TeamCard extends React.Component {

  render() {
    let { id, away, score, rank } = this.props;
    let classes = classNames({
      'team-card': true,
      'away': away
    });

    let team = TEAMS[id] || {};

    let profileImg = require(`../../user_pics/${team.picture}`);

    return (
      <div className={`${classes} ${rank===1 ? 'first' : '' }`}>
        <div className={`rank`}>
          {rank}
        </div>
        <div className='flag'>
          <img src={ profileImg } alt={ team.user } className="clip-circle" />
          <img src={ team.flag } alt={ team.user } className="clip-circle-small" />
        </div>
        <div className="user">
          <div className='user'>
            { team.user }
          </div>
          <div className='team'>
            { id }
          </div>
        </div>
        <div className="score">
          {score}
        </div>
      </div>
    );
  }
}

export default TeamCard;
