import React from 'react';

import DirtiestScore from '../components/dirtiest';
import WorstScore from '../components/worst';

export function getBiggestLosses(matches) {
  const worstGoalDiffs = startedMatches(matches)
    .map(getLosingGoalDiff)
    .reduce(teamsReducer, {});

  return Object.keys(worstGoalDiffs)
    .sort((a, b) => worstGoalDiffs[b].diff - worstGoalDiffs[a].diff)
    .map(code => [code, worstGoalDiffs[code].score]);
}

function getLosingGoalDiff({ home_team, away_team }) {
  let code = away_team.code;
  let diff = home_team.goals - away_team.goals;
  let score = `${home_team.goals} - ${away_team.goals}`;
  // if the home team lost
  if (diff < 0) {
    code = home_team.code;
    diff = -diff;
  }
  else {
    score = score.split('').reverse().join('');
  }
  return {
    code,
    diff,
    score
  }
}

function teamsReducer(col, team) {
  if ((!(team.code in col)) || (col[team.code].diff < team.diff)) {
    col[team.code] = {diff: team.diff, score: team.score};
  }
  return col;
}

function startedMatches(matches) {
  return matches.filter(match => match.time !== null);
}

function getCards(match, side) {
  let teamCode = match[`${side}_team`].code;
  let yellow = match[`${side}_team_events`].filter(e => e.type_of_event === 'yellow-card').length;
  let red = match[`${side}_team_events`].filter(e => e.type_of_event === 'red-card').length;

  return {
    teamCode,
    yellow,
    red
  };
}

export function rankDirtiestTeams(matches) {
  const cardData = startedMatches(matches).reduce((col, match) => {
    ['home', 'away'].forEach(side => {
      let cards = getCards(match, side);
      if (cards.teamCode in col) {
        cards.red += col[cards.teamCode].red;
        cards.yellow += col[cards.teamCode].yellow;
      }
      col[cards.teamCode] = {
        red: cards.red,
        yellow: cards.yellow,
        score: (cards.red * 2) + cards.yellow
      }
    });
    return col;
  }, {});

  let sortedList = Object.keys(cardData)
    .sort((a, b) => cardData[b].score - cardData[a].score)
    .map(teamCode => {
      let team = cardData[teamCode];
      return [
        teamCode,
        <ul className='dirtiest-scores'>
          <DirtiestScore score={{yellow: team.yellow, red: team.red}} />
        </ul>
      ];
    });
  return sortedList;
}

export function getFastestGoals(matches) {
  let goals = [];
  startedMatches(matches).forEach(m => {
    goals = goals.concat(getGoals(m, 'home'));
    goals = goals.concat(getGoals(m, 'away'));
  })

  return goals
    .sort((a, b) => a[1] - b[1])
    .map(g => [g[0], `${g[1]} mins`]);
}

function getGoals(match, side) {
  return match[`${side}_team_events`]
    // TODO handle type = goal-own, do we want to include them?
    .filter(e => (e.type_of_event ==='goal' || e.type_of_event === 'goal-penalty'))
    .map(g => [match[`${side}_team`].code, convertToMins(g.time)]);
}

const convertToMins = (goalTimeString) => {
  const mins = goalTimeString.split("'")
    .map(t => t.replace('+', ''))
    .filter(t => t !== "");
  return mins.reduce((a, b) => parseInt(a) + parseInt(b), 0);
}

export function getWorstTeams(results) {
  return results.sort((a, b) => {
    if (a.losses === b.losses) {
      if (a.goal_differential === b.goal_differential) {
        return a.goals_for - b.goals_for;
      }
      return a.goal_differential - b.goal_differential;
    }
    return b.losses - a.losses;
  })
    .map(team => {
    return [
      team.fifa_code,
      <WorstScore lost={team.losses}
        gd={team.goal_differential}
        scored={team.goals_for}
      />
    ];
  });
}
