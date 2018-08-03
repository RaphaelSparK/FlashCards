import React, { Component } from 'react'
import { Text, ScrollView, View, TouchableOpacity, TextInput,Alert } from 'react-native'

import { saveDeckTitle } from  '../utils/api';

class NewDeck extends Component {
  state = { name: '' };

  cancel = () => {
    this.props.navigation.goBack();
  }

  create = () => {
    saveDeckTitle(this.state.name.trim())
    .then(() => {
      this.props.navigation.goBack();
      this.props.navigation.state.params.onGoBack(this.state.name.trim());
    })
    .catch(err =>
      Alert.alert('Erro', err.message, [{ text: 'OK' }], { cancelable: true })
    );
  }

  render () {
    return (
      <View>
        <Text>Create Deck</Text>
        <TextInput
          value={this.state.name}
          style={{height: 40}}
          placeholder="Type here a deck name!"
          onChangeText={(name) => this.setState({name})}
        />
        <TouchableOpacity onPress={this.create}>
          <Text>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.cancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NewDeck
