import React from 'react';

import './dirtiest.css';

const YellowCard = ({score}) =>
  <div className="card-container">
    <div className="dcard-score">{score}x</div>
    <div className="dcard yellow" />
  </div>;

const RedCard = ({score}) =>
  score
  ? <div className="card-container">
      <div className="dcard-score">{score/2}x</div>
      <div className="dcard red" />
    </div>
  : <div className="card-container">
      <div className="dcard-score">{score/2}x</div>
      <div className="dcard red" />
    </div>;

export const DirtiestScore = ({score}) =>
  score
  ? <div className="Dirtiest-score">
      <YellowCard score={score.yellow} />
      <RedCard score={score.red} />
      <div className="dirtiest-total">{ score.yellow + score.red }</div>
    </div>
  : null;

export default DirtiestScore;
