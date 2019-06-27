import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import { login } from '../store/actions';

import { Button, Form, Grid, Message, Icon } from 'semantic-ui-react';

class Login extends React.Component {
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

  login = e => {
    e.preventDefault();
    this.props
      .login(this.state.credentials)
      .then(() => this.props.history.push('/classroom'));
  };

  render() {
    return (
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Message attached header='Login' size='large' />
          <Form onSubmit={this.login} className='attached fluid segment'>
            <Form.Input
              fluid
              type='text'
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
              {this.props.loggingIn ? (
                <Loader type='ThreeDots' color='white' height='12' width='26' />
              ) : (
                'Login'
              )}
            </Button>
          </Form>
          <Message attached='bottom' warning>
            <Icon name='help' />
            Don't have an account yet?
            <Button
              size='small'
              style={{ marginLeft: 20 }}
              onClick={() => this.props.history.push('/register')}
            >
              Join
            </Button>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ error, loggingIn }) => ({
  error,
  loggingIn
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
