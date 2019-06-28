import React from 'react';

class AudioListener extends React.Component {
  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.audioData = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
  }

  componentDidUpdate() {
    this.analyser.getByteTimeDomainData(this.audioData);
    if (Math.max.apply(Math, this.audioData) > this.props.threshold) {
      this.props.handleAboveThreshold();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return (
      <div className='microphone'>
        🎤 {Math.max.apply(Math, this.audioData) - 128}
      </div>
    );
  }
}

export default AudioListener;
