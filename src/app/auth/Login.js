import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import { login } from '../store/actions';

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
      .then(() => this.props.history.push('/game'));
  };

  render() {
    return (
      <div className='login-form'>
        <form onSubmit={this.login}>
          <label for='username'>Username</label>
          <input
            type='text'
            name='username'
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <label for='password'>Password</label>
          <input
            type='password'
            name='password'
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button type='submit'>
            {this.props.loggingIn ? (
              <Loader type='ThreeDots' color='#1f2a38' height='12' width='26' />
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className='switchAuthMode'>
          Don't have an account yet?
          <button onClick={() => this.props.history.push('/register')}>
            Join
          </button>
        </div>
      </div>
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
