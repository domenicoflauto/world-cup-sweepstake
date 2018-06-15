import React, { Component } from 'react';

import Header from './components/header';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'leaderboards'
    }
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
      </div>
    );
  }
}

export default App;
