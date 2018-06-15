import React, { Component } from 'react';

import Header from './components/header';
import Leaderboards from './views/leaderboards';
import Teams from './views/teams';
import * as stats from './helpers/stats';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'leaderboards',
      matches : [],
    }
  }

  componentDidMount() {
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
          { this.renderView() }
        </div>
      </div>
    );
  }

}

export default App;
