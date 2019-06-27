import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Label,
  Grid,
  Message,
  Icon,
  Input
} from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { ...this.props.classroomSettings };
    this.state = { threshold: 10 };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { classroom, threshold, timer } = this.state;
    const thresholdSettings = {
      start: { threshold },
      min: 0,
      max: 255,
      step: 1,
      onChange: value => {
        this.setState({ threshold: value });
      }
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          fluid
          type='text'
          name='classroom'
          label='Classroom Name'
          value={classroom}
        />
        <Form.Field>
          <Label>Noise Threshold</Label>
          <Slider
            color='green'
            value={threshold}
            settings={thresholdSettings}
            onChange={this.handleChange}
          />
        </Form.Field>
      </Form>
    );
  }
}

export default SettingsPage;
