import React from 'react';
import AudioListener from './AudioListener/AudioListener';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      threshold: 130,
      ticks: 0,
      aboveThreshold: false
    };
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
  };

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
        aboveThreshold: true
      };
    }
    this.setState(multipleViolations);
  };

  toggleMicrophone = text => {
    console.log(text);
    if (this.state.audio) {
      this.stopMicrophone();
      this.stopTimer();
    } else {
      this.getMicrophone();
      this.startTimer();
    }
  };

  tick = () => {
    this.setState(prevState => ({
      ticks: prevState.ticks + 1,
      aboveThreshold: false
    }));
  };

  render() {
    return (
      <div className='Game'>
        <button
          className='controls'
          onClick={() => this.toggleMicrophone('wat')}
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
      </div>
    );
  }
}

export default Game;
