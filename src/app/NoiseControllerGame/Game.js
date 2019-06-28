import React from 'react';
import { connect } from 'react-redux';
import AudioListener from './AudioListener/AudioListener';

import {
  Button,
  Grid,
  Label,
  Image,
  Menu,
  Container,
  Icon
} from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import treesFrame from './assets/flora/forest/trees-frame.png';
import cartoonField from './assets/flora/forest/cartoon-field.png';
import cartoonGrass from './assets/flora/forest/cartoon-grass.png';
import EmojiCollection from './EmojiCollection';

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
      menuDropped: true
    };
  }

  componentDidMount() {
    this.emojis = [
      '🐭',
      '🦁',
      '🐻',
      '🐼',
      '🐷',
      '🐮',
      '🦊',
      '🐸',
      '🐶',
      '🐰',
      '🐯',
      '🐌'
    ];
    let inc = 0;
    const getRandomArbitrary = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);
    this.animals = this.emojis.map(glyph => {
      inc += 3;
      let parity = getRandomArbitrary(0, 2);
      return {
        glyph: glyph,
        visibility: false,
        visibilityThreshold: inc,
        startingPos: !parity ? '-200px' : '2500px',
        leftPos: getRandomArbitrary(15, 50) + parity * 35,
        bottomPos: `${getRandomArbitrary(-200, 0)}px`
      };
    });
    this.setState({ animals: this.animals });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ ticks: 0, ticksWhenSilent: 0 });
    this.resetAnimals();
  };

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
      min: 126,
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
        <div className='menu-container'>
          <div className={this.state.menuDropped ? 'dropped' : 'collapsed'}>
            <Grid>
              <Grid.Row style={{ paddingBottom: 5 }}>
                <Container>
                  <Menu size='large'>
                    <Menu.Item>
                      <Button
                        icon
                        labelPosition='left'
                        color={this.state.audio ? 'red' : 'green'}
                        onClick={() => this.toggleMicrophone('')}
                      >
                        <Icon name={this.state.audio ? 'pause' : 'play'} />
                        {this.state.audio ? 'Stop' : 'Start'}
                      </Button>
                      {this.state.audio && (
                        <div className='audio-info'>
                          <div style={{ display: 'none' }}>
                            <AudioListener
                              {...this.state}
                              handleAboveThreshold={this.handleAboveThreshold}
                            />
                          </div>
                          <span
                            style={
                              this.state.ticksWhenSilent
                                ? { color: 'black' }
                                : { color: 'red' }
                            }
                          >
                            {this.state.ticksWhenSilent}
                          </span>
                        </div>
                      )}
                    </Menu.Item>
                    {this.state.audio && (
                      <Menu.Item style={{ width: '65%' }}>
                        <Label pointing='right'>Threshold</Label>
                        <Container>
                          <Slider
                            color='green'
                            value={this.state.threshold}
                            settings={thresholdSettings}
                            onChange={this.handleChange}
                          />
                        </Container>
                      </Menu.Item>
                    )}
                    <Menu.Item position='right'>
                      <Button
                        onClick={() => {
                          localStorage.clear();
                          this.props.history.push('/login');
                        }}
                        size='small'
                      >
                        Logout
                      </Button>
                    </Menu.Item>
                  </Menu>
                </Container>
              </Grid.Row>
              <Grid.Row centered style={{ padding: 0 }}>
                <Button
                  circular
                  onClick={() =>
                    this.setState({ menuDropped: !this.state.menuDropped })
                  }
                  icon={this.state.menuDropped ? 'angle up' : 'angle down'}
                  style={{ opacity: 0.7 }}
                />
              </Grid.Row>
            </Grid>
          </div>
        </div>
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
