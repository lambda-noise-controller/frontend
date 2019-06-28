import React from 'react';
import { connect } from 'react-redux';
import AudioListener from './AudioListener/AudioListener';

import { Button, Form, Grid, Label, Image } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import treesFrame from './assets/flora/forest/trees-frame.png';
import cartoonField from './assets/flora/forest/cartoon-field.png';
import cartoonGrass from './assets/flora/forest/cartoon-grass.png';
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
      animals: []
    };
  }

  componentDidMount() {
    this.emojis = ['🐭', '🦁', '🐻', '🐼', '🐷', '🐮', '🦊', '🐸', '🐶'];
    let inc = 0;
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    this.animals = this.emojis.map(glyph => {
      inc += 5;
      return {
        glyph: glyph,
        visibility: false,
        visibilityThreshold: inc,
        leftPos: `${getRandomArbitrary(15, 85)}%`,
        bottomPos: `${getRandomArbitrary(-10, 150)}px`
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

  // resetAnimals = () => this.setState({ visibleAnimals: [] });
  resetAnimals = () => {
    const allInvisible = this.state.animals.map(animal => {
      return { ...animal, visibility: false };
    });
    this.setState({ animals: allInvisible });
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
      else {
        this.resetAnimals();
        return {
          aboveThreshold: true,
          ticksWhenSilent: 0
        };
      }
    }
    this.setState(multipleViolations);
  };

  checkVisibility = () => {
    // this.setState({
    //   visibleAnimals: this.state.animals.filter(
    //     animal => this.state.ticksWhenSilent >= animal.visibilityThreshold
    //   )
    // });
    const visibleAnimals = this.state.animals.map(animal => {
      if (this.state.ticksWhenSilent >= animal.visibilityThreshold) {
        return { ...animal, visibility: true };
      } else {
        return { ...animal };
      }
    });
    this.setState({ animals: visibleAnimals });
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
        <div className='deco'>
          <div>
            <div className='background-images'>
              <Image src={cartoonField} />
              <div className='grass-gradient' />
            </div>
            <div className='foreground-images'>
              <Image src={treesFrame} />
              <div
                className='bottom-grass'
                style={{ zIndex: 1, backgroundImage: `url(${cartoonGrass})` }}
              />
            </div>
          </div>
        </div>
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
            height: '60vh'
          }}
        >
          <Grid.Column>
            <Grid.Row>
              <EmojiCollection emojis={this.state.animals} />
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
