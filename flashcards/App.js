import React from 'react'
// import { StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Decks from './Components/Decks'

const Stack = createStackNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'Baralhos',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#66bb66'
      }
    }
  }
})

export default class App extends React.Component {
  render () {
    return (
      <Stack />
    )
  }
}
