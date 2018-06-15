import React from 'react';

import TeamCard from '../teamCard';

import './leaderBoard.css';

class LeaderBoard extends React.Component {

  render() {
    let { name, standings } = this.props;

    return (
      <div className='leader-board'>
        <h3 className='leader-board-name'>{ name }</h3>
        <ol>
          {
            standings.slice(0, 5).map((id, i) =>
              <li key={ `${name}-${i}` }>
                <TeamCard id={ id } />
              </li>
            )
          }
        </ol>
      </div>
    )
  }
}

export default LeaderBoard;
