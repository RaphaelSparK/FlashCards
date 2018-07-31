import React from 'react'
// import { StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Decks from './Components/Decks'
import NewDeck from './Components/NewDeck'
const Stack = createStackNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'Decks',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#220735'
      }
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#381A4E'
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
