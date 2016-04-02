import React from 'react';
import remark from 'remark';
import reactRenderer from 'remark-react';

const TextCell = (props) => {
  let source = props.data.source;
  if (typeof source === 'string' || source instanceof String) {
    source = [source];
  }
  source = source.reduce((text, line) =>
    (text + line.replace(/^(#{1,6})([^#\s])/, '$1 $2'))
  , '');

  return (
    <div className={'cell text_cell'}>
      <div className={'prompt input_prompt'} />
      <div className="inner_cell">{remark().use(reactRenderer).process(source)}</div>
    </div>
  );
};

TextCell.propTypes = {
  data: React.PropTypes.object,
};

export default TextCell;
