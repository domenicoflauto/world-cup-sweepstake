import React, { Component } from 'react';

import Header from './components/header';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'leaderboards',
      data : [],
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
        BIGGEST LOSS - {this.state.data.length && this.getBiggestLoss()}
      </div>
    );
  }

  getData() {
    fetch('http://worldcup.sfg.io/matches', {method: 'GET'})
      .then(resp => resp.json())
      .then(json => this.setState({data: json}));
  }

  getBiggestLoss() {
    const matches = this.state.data.filter(m => m.status === 'completed');
    // TODO handle tie breaks
    return matches[0].venue;
  }
}

export default App;
