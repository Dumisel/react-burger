import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';

class App extends React.Component {
  render () {
    return (
    <div className={ appStyles.app }>
      <AppHeader />
    </div>
    )
  }
}

export default App;
