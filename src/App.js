import React, { Component } from 'react';

import Header from './components/header';
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
    // TODO: switch the current view depending on state - add handler to update state to header
    switch(this.state.view) {
    case 'leaderboards':
      return <div />;
    case 'teams':
      return <div />;
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        { this.renderView() }
        BIGGEST LOSS - {this.state.matches.length && stats.getBiggestLosses(this.state.matches)[0]}
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
