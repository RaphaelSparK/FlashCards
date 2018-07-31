import React, { Component } from 'react'
import { Text, ScrollView, View, TouchableOpacity, TextInput } from 'react-native'

class NewDeck extends Component {
  state = { deckName: '' };

  cancel = () => {
    this.props.navigation.goBack();
  }

  create = () => {

  }

  render () {
    return (
      <View>
        <Text>Create a new deck:</Text>
        <TextInput
          value={this.state.deckName}
          style={{height: 40}}
          placeholder="Type here a deck name!"
          onChangeText={(deckName) => this.setState({deckName})}
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
