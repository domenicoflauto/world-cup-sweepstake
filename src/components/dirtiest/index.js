import React from 'react';

import './dirtiest.css';

const YellowCard = ({score}) =>
  <div className="card-container">
    <div className="dcard yellow" />
    <div className="dcard-score">{score}</div>
  </div>;

const RedCard = ({score}) =>
  <div className="card-container">
    <div className="dcard red" />
    <div className="dcard-score">{score}</div>
  </div>;

export const DirtiestScore = ({score}) =>
  <div className="Dirtiest-score">
    <YellowCard score={score.yellow} />
    <RedCard score={score.red} />
    <div className="dirtiest-total">{ score.yellow + score.red }</div>
  </div>;

export default DirtiestScore;
