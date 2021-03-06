import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import HomeScreen from './components/HomeScreen';
import PageTwo from './components/PageTwo';

export default class AwesomeProject extends Component {

  renderScene(route, navigator) {
    if (route.name === 'Home') {
      return <HomeScreen navigator={navigator} />
    }
    if (route.name === 'PageTwo') {
      return <PageTwo navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'Home' }}
        renderScene={this.renderScene}
      />
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);