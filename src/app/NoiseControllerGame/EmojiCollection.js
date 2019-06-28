import React from 'react';

import Emoji from './Emoji';

const EmojiCollection = props => {
  if (props.emojis[0]) {
    return (
      <div className='animals'>
        {props.emojis.map(emoji => {
          return <Emoji {...emoji} key={emoji.glyph} />;
        })}
      </div>
    );
  } else return null;
};

export default EmojiCollection;
