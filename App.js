import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import params from './src/params'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Mines!!</Text>
        <Text style={styles.instructions}>tamanho da grade: 
        {params.getRowAmount()}x{params.getColumnsAmount()} </Text>
        <StatusBar style="auto" />
      </View>
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
  Welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
