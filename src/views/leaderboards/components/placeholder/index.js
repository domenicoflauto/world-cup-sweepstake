import React from 'react';

class Placeholder extends React.Component {

  render() {
    let { name } = this.props;

    return (
      <div className='leader-board'>
        <div className='leader-board-name placeholder'>
          <h3>{ name }</h3>
          <span className="view-all">(coming soon)</span>
      </div>
        <ul className='leaderboard-ranks placeholder'>
          <li /><li /><li /><li /><li />
        </ul>
      </div>
    );
  }
}

export default Placeholder;
