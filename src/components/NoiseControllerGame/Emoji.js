import React from 'react';

const Emoji = props => {
  return <div className={!props.visibility && 'hidden'}>{props.glyph}</div>;
};

export default Emoji;
