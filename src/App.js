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
    this.getData();
  }

  renderView() {
    switch(this.state.view) {
    case 'leaderboards':
      return <Leaderboards />;
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
        BIGGEST LOSS - {this.state.data.length && this.getBiggestLoss()}
      </div>
    );
  }

  getData() {
    fetch('http://worldcup.sfg.io/matches', {method: 'GET'})
      .then(resp => resp.json())
      .then(json => this.setState({matches: json}));
  }

}

export default App;
