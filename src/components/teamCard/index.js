import React from 'react';
import classNames from 'classnames';

import { getFlag } from '../../helpers/flags';

import './teamCard.css';

class TeamCard extends React.Component {

  render() {
    let { team, user, away } = this.props;
    let classes = classNames({
      'team-card': true,
      'away': away
    });

    return (
      <div className={ classes }>
        <div className='user'>({ user })</div>
        <div className='flag'>
          <img src={ getFlag(team) } />
        </div>
      </div>
    );
  }
}

export default TeamCard;
