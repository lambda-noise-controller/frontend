import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { addClassroom, getUserId, getClassroom } from '../../store/actions';
import { Button, Form, Grid, Message } from 'semantic-ui-react';

class AddClassroom extends React.Component {
  state = { classroom: '' };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // this.props.getClassroom(this.props.token, 1);
    if (this.props.userId) {
      this.props
        .addClassroom(this.props.token, this.state.classroom, this.props.userId)
        .then(() => this.props.history.push('/classroom/success'));
    } else {
      this.props
        .getUserId(this.props.token, this.props.username)
        .then(
          this.props.addClassroom(
            this.props.token,
            this.state.classroom,
            this.props.userId
          )
        )
        .then(() => this.props.history.push('/classroom/success'));
    }
  };

  render() {
    const { classroom } = this.state;
    return (
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Message attached header='Add Classroom' size='large' />
          <Form onSubmit={this.handleSubmit} className='attached fluid segment'>
            <Form.Input
              fluid
              type='text'
              name='classroom'
              label='Classroom Name'
              value={classroom}
              onChange={this.handleChange}
            />
            <Button
              color='green'
              size='large'
              type='submit'
              disabled={!this.state.classroom}
            >
              {this.props.addingClassroom ? (
                <Loader type='ThreeDots' color='white' height='12' width='26' />
              ) : (
                'Add'
              )}
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({
  error,
  addingClassroom,
  token,
  userId,
  username
}) => ({
  error,
  addingClassroom,
  token,
  userId,
  username
});

export default connect(
  mapStateToProps,
  { addClassroom, getUserId, getClassroom }
)(AddClassroom);
