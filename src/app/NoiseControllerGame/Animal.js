import React from 'react';

class Animal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.emoji}</div>;
  }
}

export default Animal;
