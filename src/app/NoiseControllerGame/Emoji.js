import React from 'react';

const Emoji = props => {
  return (
    <div
      className={!props.visibility ? 'hidden' : 'visible'}
      style={
        !props.visibility
          ? { left: '-100px', bottom: props.bottomPos }
          : { left: props.leftPos, bottom: props.bottomPos }
      }
    >
      {props.glyph}
    </div>
  );
};

export default Emoji;
