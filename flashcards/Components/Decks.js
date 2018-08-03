import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'

import { getDecks } from '../utils/api'

class Decks extends Component {
  state = { deckList: [] };

fetchDecks = () => {
  getDecks().then(decks => {
    if (decks) this.setState({ deckList: Object.values(decks) })
  })
}

openDeck = title =>
    this.props.navigation.navigate('Deck', {
      title,
      refresh: this.fetchDecks
    });

   createDeck  = () =>
    this.props.navigation.navigate('NewDeck', {
      onGoBack: deckName => {
        this.openDeck(deckName);
        this.fetchDecks();
      }
    });

componentDidMount() {
  this.fetchDecks()
}

  render () {
    console.log(this.state.deckList)
    return (
      <View>
         <ScrollView>{this.state.deckList.map((m,i) => (
          <TouchableOpacity key={i} onPress={() => this.openDeck(m.title)}>
            <Text>{m.title}</Text>
            <Text>{m.questions.length} card{m.questions.length > 0? 's':''}</Text>
          </TouchableOpacity>
         ))}
         </ScrollView>
        <TouchableOpacity onPress={this.createDeck}>
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Decks
