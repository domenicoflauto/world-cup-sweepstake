import React, { Component } from 'react';

import Header from './components/header';
import Leaderboards from './views/leaderboards';
import Teams from './views/teams';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'leaderboards',
      matches : [],
    }
    this.renderTeams = this.changeView.bind(this, 'teams');
    this.renderLeaderboards = this.changeView.bind(this, 'leaderboards');
    this.getMatchData = this.getData.bind(this);
  }

  changeView(view) {
    this.setState({view: view});
  }

  componentDidMount() {
    this.getMatchData();
    // refersh the data every 60 seconds
    setInterval(this.getMatchData, 60 * 1000)
  }

  getData() {
    fetch('http://worldcup.sfg.io/matches', {method: 'GET'})
      .then(resp => resp.json())
      .then(json => this.setState({matches: json}));
  }

  renderView() {
    switch(this.state.view) {
    case 'leaderboards':
      return <Leaderboards matches={this.state.matches} />;
    case 'teams':
      return <Teams />;
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className='view'>
          <span
            onClick={this.renderLeaderboards}
            className={`nav-item ${this.state.view==='leaderboards' ? 'active' : ''}`}>
            Leaderboards
          </span>
          <span
            onClick={this.renderTeams}
            className={`nav-item ${this.state.view==='teams' ? 'active' : ''}`}>
            Teams
          </span>
          { this.renderView() }
        </div>
      </div>
    );
  }

}

export default App;
