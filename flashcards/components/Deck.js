import React from 'react';
import { AsyncStorage, View, Text, TouchableOpacity  } from 'react-native';
import { getDeck } from '../utils/api';

export default class Deck extends React.Component {
  state = { cards: '-' };

  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.title };
  };

  componentDidMount = () => this.refresh();

  refresh = () =>
    getDeck(this.props.navigation.state.params.title)
      .then(deck => this.setState({ cards: deck.questions.length }))
      .catch(err => console.error(err));

  onAdd = () =>
    this.props.navigation.navigate('NewCard', {
      title: this.props.navigation.state.params.title,
      goBack: () => {
        this.refresh();
        this.props.navigation.state.params.refresh();
      }
    });
    onPlay = () =>
    this.props.navigation.navigate('PlayDeck', {
      title: this.props.navigation.state.params.title
    });

  onBackPress = () => this.props.navigation.goBack();

  render = () => (
    <View>
      <Text>{this.props.navigation.state.params.title}</Text>
      <Text>{this.state.cards} cards</Text>
      <TouchableOpacity onPress={this.onPlay}>
        <Text>Start a Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.onAdd}>
        <Text>Create New Question</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.onBackPress}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}
