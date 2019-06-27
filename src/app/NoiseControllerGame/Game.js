import React from 'react';
import { connect } from 'react-redux';
import AudioListener from './AudioListener/AudioListener';

import { Button, Form, Grid, Label, Image } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import cartoonRiverside from './assets/flora/cartoon-riverside.png';
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

  toggleMicrophone = text => {
    if (this.state.audio) {
      this.stopMicrophone();
      this.stopTimer();
    } else {
      this.getMicrophone();
      this.startTimer();
    }
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

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const thresholdSettings = {
      start: this.state.threshold,
      min: 0,
      max: 255,
      step: 1,
      onChange: value => {
        this.setState({ threshold: value });
      }
    };
    return (
      <div className='Game'>
        <Image
          src={cartoonRiverside}
          style={{
            position: 'absolute',
            top: 0
          }}
        />
        <Button
          onClick={() => {
            localStorage.clear();
            this.props.history.push('/login');
          }}
          size='small'
          style={{ position: 'absolute', top: 10, right: 20 }}
        >
          Logout
        </Button>
        <Grid
          relaxed
          textAlign='center'
          // style={{ height: '10vh' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450, marginLeft: 400 }}>
            <Grid.Row style={{ margin: 10 }}>
              <Button
                color={this.state.audio ? 'red' : 'green'}
                onClick={() => this.toggleMicrophone('')}
              >
                {this.state.audio ? 'Stop Mic' : 'Start Mic'}
              </Button>
            </Grid.Row>
            {this.state.audio && (
              <Grid.Row style={{ margin: 10 }}>
                <AudioListener
                  {...this.state}
                  handleAboveThreshold={this.handleAboveThreshold}
                />
                <Form.Field>
                  <Label>Threshold: {this.state.threshold}</Label>
                  <Slider
                    color='green'
                    value={this.state.threshold}
                    settings={thresholdSettings}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Grid.Row>
            )}
          </Grid.Column>
        </Grid>
        <Grid
          verticalAlign='bottom'
          style={{
            height: '50vh'
          }}
        >
          <Grid.Column>
            <Grid.Row>
              <EmojiCollection emojis={this.state.visibleAnimals} />
            </Grid.Row>
            <Grid.Row />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});

export default connect(
  mapStateToProps,
  {}
)(Game);
