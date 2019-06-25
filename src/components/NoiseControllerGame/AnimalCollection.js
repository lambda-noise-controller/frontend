import React from 'react';

const AnimalCollection = AnimalComponent => {
  class Animals extends React.Component {
    render() {
      return (
        <div className='animals'>
          {this.props.data.map(<AnimalComponent {...this.props} />)}
        </div>
      );
    }
  }
  return Animals;
};

export default AnimalCollection;
