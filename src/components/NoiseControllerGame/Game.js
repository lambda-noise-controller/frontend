import React from 'react';
import AudioListener from './AudioListener/AudioListener';

import EmojiCollection from './EmojiCollection';

import './Game.scss';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      threshold: 130,
      ticks: 0,
      ticksWhenSilent: 0,
      aboveThreshold: false,
      animals: [],
      visibleAnimals: []
    };
  }

  componentDidMount() {
    this.emojis = ['🐭', '🦁', '🐻', '🐼', '🐷', '🐮', '🦊', '🐸', '🐶'];
    let inc = 0;
    this.animals = this.emojis.map(glyph => {
      inc += 5;
      return {
        glyph: glyph,
        visibility: true,
        visibilityThreshold: inc
      };
    });
    this.setState({ animals: this.animals });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick, 500);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ ticks: 0, ticksWhenSilent: 0 });
    this.resetAnimals();
  };

  resetAnimals = () => this.setState({ visibleAnimals: [] });

  getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  };

  stopMicrophone = () => {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  };

  handleAboveThreshold = () => {
    function multipleViolations(state) {
      if (state.aboveThreshold) return null;
      return {
        aboveThreshold: true,
        ticksWhenSilent: 0
      };
    }
    this.setState(multipleViolations);
  };

  toggleMicrophone = text => {
    if (this.state.audio) {
      this.stopMicrophone();
      this.stopTimer();
    } else {
      this.getMicrophone();
      this.startTimer();
    }
  };

  checkVisibility = () => {
    this.setState({
      visibleAnimals: this.state.animals.filter(
        animal => this.state.ticksWhenSilent >= animal.visibilityThreshold
      )
    });
  };

  tick = () => {
    this.setState(prevState => ({
      ticks: prevState.ticks + 1,
      ticksWhenSilent: prevState.ticksWhenSilent + 1,
      aboveThreshold: false
    }));
    this.checkVisibility();
  };

  render() {
    return (
      <div className='Game'>
        <button
          className='toggleMicButton'
          onClick={() => this.toggleMicrophone('')}
        >
          {this.state.audio ? 'Stop Mic' : 'Start Mic'}
        </button>
        {this.state.audio && (
          <div>
            <AudioListener
              {...this.state}
              handleAboveThreshold={this.handleAboveThreshold}
            />
            {this.state.aboveThreshold ? <h1>loud</h1> : <h1>quiet</h1>}
          </div>
        )}
        <EmojiCollection emojis={this.state.visibleAnimals} />
      </div>
    );
  }
}

export default Game;
