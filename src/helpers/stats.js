export function getBiggestLosses(matches) {
  const worstGoalDiffs = matches
    .filter(m => m.status === 'completed')
    .map(getLosingGoalDiff)
    .reduce(teamsReducer, {});

  return Object.keys(worstGoalDiffs)
    .sort((a, b) => worstGoalDiffs[a] < worstGoalDiffs[b]);
}

function getLosingGoalDiff({ home_team, away_team }) {
  const homeDiff = home_team.goals - away_team.goals;
  // always return a positive diff ie goals the team lost by
  if (homeDiff < 0) {
    return {code: home_team.code, diff: -homeDiff};
  }
  return {code: away_team.code, diff: homeDiff};
}

function teamsReducer(col, team) {
  if ((!(team.code in col)) || (col[team.code] < team.diff)) {
    col[team.code] = team.diff;
  }
  return col;
}
