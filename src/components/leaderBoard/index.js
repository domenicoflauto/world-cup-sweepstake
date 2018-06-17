import React from 'react';

import TeamCard from '../teamCard';

import './leaderBoard.css';

class LeaderBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.toggleFullList = this.showModal.bind(this);
  }

  showModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    let { name, standings } = this.props;

    return (
      <div className='leader-board'>
        <h3 className='leader-board-name' onClick={ this.toggleFullList }>{ name }</h3>
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
        {
          this.state.showModal
            ? (
                <div className='modal'>
                  <div className='full-leader-board'>
                    <h3 className='leader-board-name'  onClick={ this.toggleFullList }>
                      { name }
                      <span className='close-button' />
                    </h3>
                    <ul className='leaderboard-ranks'>
                      {
                        standings.map((team, i) =>
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
                </div>
            ) : null
        }
      </div>
    )
  }
}

export default LeaderBoard;
