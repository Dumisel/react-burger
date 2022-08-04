import React from 'react';
import mainStyles from './main.module.css';

class Main extends React.Component {
  render () {
    return (
      <div className={ mainStyles.main }>
        {this.props.children}
      </div>
      )
    } 
}

export default Main;