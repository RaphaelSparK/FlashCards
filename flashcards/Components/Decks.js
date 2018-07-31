import React, { Component } from 'react'
import { Text, ScrollView, View, TouchableOpacity } from 'react-native'

class Decks extends Component {

  newDeck = () =>
  this.props.navigation.navigate('NewDeck', {
    onGoBack: deckName => {
      this.openDeck(deckName);
      this.refresh();
    }
  });

  render () {
    return (
      <View>
        <ScrollView></ScrollView>
        <TouchableOpacity onPress={this.newDeck}>
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Decks
