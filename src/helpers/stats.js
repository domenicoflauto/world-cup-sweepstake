export function getBiggestLosses(matches) {
  const worstGoalDiffs = matches
    .filter(m => m.status === 'completed')
    .map(getLosingGoalDiff)
    .reduce(teamsReducer, {});

  return Object.keys(worstGoalDiffs)
    .sort((a, b) => worstGoalDiffs[a] < worstGoalDiffs[b])
    .map(code => [code, worstGoalDiffs[code].score]);
}

function getLosingGoalDiff({ home_team, away_team }) {
  let code = away_team.code;
  let diff = home_team.goals - away_team.goals;
  // if the home team lost
  if (diff < 0) {
    code = home_team.code;
    diff = -diff;
  }
  return {
    code: code,
    diff: diff,
    score: `${home_team.goals} - ${away_team.goals}`
  }
}

function teamsReducer(col, team) {
  if ((!(team.code in col)) || (col[team.code] < team.diff)) {
    col[team.code] = {diff: team.diff, score: team.score};
  }
  return col;
}
