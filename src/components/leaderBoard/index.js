import React from 'react';

import TeamCard from '../teamCard';

import './leaderBoard.css';

class LeaderBoard extends React.Component {

  render() {
    let { name, standings } = this.props;

    return (
      <div className='leader-board'>
        <h3 className='leader-board-name'>{ name }</h3>
        <ul className='leaderboard-ranks'>
          {
            standings.slice(0, 5).map((team, i) =>
              <li key={ `${name}-${i}` }>
                <TeamCard
                  rank={ i+1 }
                  id={ team[0] }
                  score={ team[1] }
                />
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default LeaderBoard;
