import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import { register } from '../store/actions';

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
      <div className='register-form'>
        <form onSubmit={this.register}>
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
            {this.props.registeringUser ? (
              <Loader type='ThreeDots' color='#1f2a38' height='12' width='26' />
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className='switchAuthMode'>
          Already have an account?
          <button onClick={() => this.props.history.push('/login')}>
            Login
          </button>
        </div>
      </div>
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
