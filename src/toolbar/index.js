import React from 'react';

class Toolbar extends React.Component {
  render() {
    return (
      <div style={{
        paddingTop: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
      }} ref="cells"
      >
      toolbar
      </div>
    );
  }
}

export default Toolbar;
