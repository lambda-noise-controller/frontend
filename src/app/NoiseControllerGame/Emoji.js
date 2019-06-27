import React from 'react';

const Emoji = props => {
  return (
    <div className={!props.visibility ? 'hidden' : 'visible'}>
      {props.glyph}
    </div>
  );
};

export default Emoji;
