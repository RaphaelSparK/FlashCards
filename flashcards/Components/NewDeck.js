import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet,Alert } from 'react-native'

import { saveDeckTitle } from  '../utils/api';
import { backColor,okColor } from '../utils/colors'

class NewDeck extends Component {
  state = { name: '' };

  cancel = () => {
    this.props.navigation.goBack();
  }

  create = () => {
    this.state.name.trim() === '' ? Alert.alert(
      'Error',
      'Enter a name for the deck.',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    ) :
    saveDeckTitle(this.state.name.trim())
    .then(() => {
      this.props.navigation.goBack();
      this.props.navigation.state.params.onGoBack(this.state.name.trim());
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Create Deck</Text>
          <TextInput
            value={this.state.name}
            style={styles.txtInput}
            placeholder="Type here a deck name!"
            onChangeText={(name) => this.setState({name})}
          />
        </View>
        <View >
          <TouchableOpacity style={[styles.btnOk,styles.btnBig]} onPress={this.create}>
            <Text style={styles.textBtn}>Create</Text>
          </TouchableOpacity >
          <TouchableOpacity style={[styles.btnBack,styles.btnBig]} onPress={this.cancel}>
            <Text style={styles.textBtn}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </View>
      )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent : 'space-between',
    alignItems: 'stretch',
  },
  btnBig: {
    padding: 20,
    margin: 5,
    alignItems: 'center',
  },
  txtInput: {
    height: 40,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  textBtn: {
    color: 'white',
    fontSize: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btnBack: {
    backgroundColor: backColor,
  },
  btnOk: {
    backgroundColor: okColor,
  }
});
export default NewDeck
