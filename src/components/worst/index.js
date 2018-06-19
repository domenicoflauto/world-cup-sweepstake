import React from 'react';

import './worst.css';

const WorstScore = ({lost, gd, scored}) => {
  return (
    <ul className='worst-team-scores'>
      <li>lost:<span>{ lost }</span></li>
      <li>gd:<span>{ gd }</span></li>
      <li>scored:<span>{ scored }</span></li>
    </ul>
  );
};

export default WorstScore;
