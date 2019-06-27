import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import { register } from '../store/actions';

import { Button, Form, Grid, Message, Icon } from 'semantic-ui-react';

class Register extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  register = e => {
    e.preventDefault();
    this.props
      .register(this.state.credentials)
      .then(() => this.props.history.push('/login'));
  };

  render() {
    return (
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Message
            attached
            header='Register'
            content='Start using Noise Controller in your classroom today!'
            size='large'
          />
          <Form onSubmit={this.register} className='attached fluid segment'>
            <Form.Input
              fluid
              type='text'
              j
              name='username'
              icon='user'
              iconPosition='left'
              value={this.state.credentials.username}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              type='password'
              name='password'
              icon='lock'
              iconPosition='left'
              value={this.state.credentials.password}
              onChange={this.handleChange}
            />
            <Button
              color='green'
              size='large'
              type='submit'
              disabled={
                !(
                  this.state.credentials.username &&
                  this.state.credentials.password
                )
              }
            >
              {this.props.registeringUser ? (
                <Loader type='ThreeDots' color='white' height='12' width='26' />
              ) : (
                'Login'
              )}
            </Button>
          </Form>
          <Message attached='bottom' warning>
            <Icon name='help' />
            Already have an account?
            <Button
              size='small'
              style={{ marginLeft: 20 }}
              onClick={() => this.props.history.push('/login')}
            >
              Login
            </Button>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ error, registeringUser }) => ({
  error,
  registeringUser
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
