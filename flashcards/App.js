import React from 'react'
// import { StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import NewCard from './components/NewCard'
import PlayDeck from './components/PlayDeck'

import { barColor } from './utils/colors'

const Stack = createStackNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'Decks',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: barColor
      }
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: barColor
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: barColor
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: barColor
      }
    }
  },
  PlayDeck: {
    screen: PlayDeck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: barColor
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
