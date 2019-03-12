import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Root from './src';

console.disableYellowBox=true;

export default class App extends Component {
  render() {
    return (
      <Root/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
