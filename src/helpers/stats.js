export function getBiggestLosses(matches) {
  const goalDiffs = matches
    .filter(m => m.status === 'completed')
    .map(getLosingGoalDiff)
    .sort()
    .reverse()
    .map(m => m.split('_')[1]);
  return goalDiffs.slice(0, 4);
}

function getLosingGoalDiff({ home_team, away_team }) {
  const homeDiff = home_team.goals - away_team.goals;
  // always return a positive diff ie goals the team lost by
  if (homeDiff < 0) {
    return `${-homeDiff}_${home_team.code}`
  }
  return `${homeDiff}_${away_team.code}`
}
