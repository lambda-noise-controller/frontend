import React from 'react';

const Emoji = props => {
  return (
    <div
      className={!props.visibility ? 'hidden' : 'visible'}
      style={
        !props.visibility
          ? {
              left: props.startingPos,
              bottom: props.bottomPos,
              animationDelay: `0.${props.leftPos}s`
            }
          : {
              left: `${props.leftPos}%`,
              bottom: props.bottomPos,
              animationDelay: `0.${props.leftPos}s`
            }
      }
    >
      <span role='img' aria-label='Animal'>
        {props.glyph}
      </span>
    </div>
  );
};

export default Emoji;
