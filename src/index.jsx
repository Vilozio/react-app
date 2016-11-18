import React from 'react';
import ReactDOM from 'react-dom';
import Print from './print.js';
import './style.css';

class Index extends React.Component {
  render() {
    return (
      <div>
        <Print/>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));