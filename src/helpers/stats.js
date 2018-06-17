import React from 'react';

import DirtiestScore from '../components/dirtiest';

export function getBiggestLosses(matches) {
  const worstGoalDiffs = matches
    .filter(m => m.status === 'completed')
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
  if ((!(team.code in col)) || (col[team.code] < team.diff)) {
    col[team.code] = {diff: team.diff, score: team.score};
  }
  return col;
}

function startedMatches(matches) {
  return matches.filter(match => match.time !== null);
}

export function rankDirtiestTeams(matches) {
  const cardData = startedMatches(matches).reduce((col, match) => {
    let teams = [{
      id: match.home_team.code ,
      yellow: match.home_team_events.filter(e => e.type_of_event === 'yellow-card').length,
      red: match.home_team_events.filter(e => e.type_of_event === 'red-card').length
    },
    {
      id: match.away_team.code,
      yellow: match.away_team_events.filter(e => e.type_of_event === 'yellow-card').length,
      red: match.away_team_events.filter(e => e.type_of_event === 'red-card').length
    }];

    teams.forEach(team => {
      let existingTeam = col.find(t => t[0] === team.id);
      if (existingTeam) {
        let { yellow, red, score } = existingTeam;
        col = [
          ...col.filter(t => t.id !== team.id),
          [
            team.id,
            {
              yellow: yellow + team.yellow,
              red: red + team.red,
              score: score + (team.red * 2) + team.yellow
            }
          ]
        ]
      }
      else {
        col = [
          ...col,
          [
            team.id,
            {
              yellow: team.yellow,
              red: team.red,
              score: (team.red * 2) + team.yellow
            }
          ]
        ]
      }
    });
    return col;
  }, []);

  let sorted = cardData.sort((a, b) => b[1].score - a[1].score);
  return sorted.map(a => {
    return [
      a[0],
      (
        <ul className='dirtiest-scores'>
          <DirtiestScore score={{yellow: a[1].yellow, red: a[1].red*2}} />
        </ul>
      )
    ];
  });
}

export function getFastestGoals(matches) {
  let goals = [];
  matches.filter(m => m.status === 'completed').forEach(m => {
    goals = goals.concat(getGoals(m, 'home'));
    goals = goals.concat(getGoals(m, 'away'));
  })

  return goals
    .sort((a, b) => a[1] - b[1])
    .map(g => [g[0], `${g[1]} mins`]);
}

function getGoals(match, side) {
  return match[`${side}_team_events`]
    .filter(e => e.type_of_event ==='goal')
    // TODO change time into an int...
    .map(g => [match[`${side}_team`].code, convertToMins(g.time)]);
}

const convertToMins = (goalTimeString) => {
  const mins = goalTimeString.split("'")
    .map(t => t.replace('+', ''))
    .filter(t => t !== "");
  return mins.reduce((a, b) => parseInt(a) + parseInt(b), 0);
}
