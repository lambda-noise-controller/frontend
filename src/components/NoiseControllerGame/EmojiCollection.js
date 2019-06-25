import React from 'react';

import Emoji from './Emoji';
import './Game.scss';

const EmojiCollection = props => {
  console.log(props.emojis);
  return (
    <div className='animals'>
      {props.emojis.map(emoji => {
        return (
          <Emoji
            glyph={emoji.glyph}
            visibility={emoji.visibility}
            visibilityThreshold={emoji.visibilityThreshold}
          />
        );
      })}
    </div>
  );
};

export default EmojiCollection;
