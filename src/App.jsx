import React, { Component } from 'react';
import Controls from "./Controls/Controls";


class App extends Component {
  render() {
    return (
      <Controls>
        <div id="game-entry"></div>
      </Controls>
    );
  }
}

export default App;
