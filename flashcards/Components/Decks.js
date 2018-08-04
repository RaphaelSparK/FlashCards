import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView,StyleSheet } from 'react-native'

import { getDecks } from '../utils/api'

import { decks,backColor,okColor } from '../utils/colors'

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
    return (
      <View  style={styles.container}>
         <ScrollView>{this.state.deckList.map((m,i) => (
          <TouchableOpacity style={styles.deck} key={i} onPress={() => this.openDeck(m.title)}>
            <Text style={styles.cardTitle}>{m.title}</Text>
            <Text style={styles.cardInfo}>{m.questions.length} card{m.questions.length > 0? 's':''}</Text>
          </TouchableOpacity>
         ))}
         </ScrollView>
        <TouchableOpacity style={[styles.btnOk,styles.btnBig]} onPress={this.createDeck}>
          <Text style={styles.textBtn}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent : 'center',
    alignItems: 'stretch',
  },
  btnBig: {
    padding: 20,  
    alignItems: 'center',
    margin: 5,
  },
  textBtn: {
    color: 'white',
    fontSize: 24
  },
  deck: {
    backgroundColor: decks,
    padding: 20,  
    alignItems : 'center',
    margin: 5,
    borderWidth: 1,
    borderRadius: 10
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  }
  ,
  cardInfo: {
    fontSize: 18,
  },
  btnBack: {
    backgroundColor: backColor,
  },
  btnOk: {
    backgroundColor: okColor,
  }
});

export default Decks
