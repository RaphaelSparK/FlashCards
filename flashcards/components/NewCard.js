import React from 'react';
import { AsyncStorage, Alert, View, Text, TouchableOpacity, TextInput } from 'react-native';

import { addCardToDeck } from '../utils/api';


export default class NewCard extends React.Component {
  state = {
    question: '',
    answer: ''
  };
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.title} - Add card` };
  };

  onAdd = () => {
    if (
      !this.state.question ||
      this.state.question.trim().length === 0 ||
      this.state.question.length > 44
    )
      return Alert.alert(
        'Invalid Question',
        'Maximum question size is 44 character',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    if (
      !this.state.answer ||
      this.state.answer.trim().length === 0 ||
      this.state.answer.length > 144
    )
      return Alert.alert(
        'Invalid  Answer',
        'Response must be between 1 and 144 characters',
        [{ text: 'OK' }],
        { cancelable: true }
      );

    addCardToDeck(this.props.navigation.state.params.title, {
      question: this.state.question.trim(),
      answer: this.state.answer.trim()
    })
      .then(() => {
        this.props.navigation.state.params.goBack();
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.error(err);
        return Alert.alert('Erro', err.message, [{ text: 'OK' }], {
          cancelable: true
        });
      });
  };

  onCancel = () => this.props.navigation.goBack();
  onQuestionChanged = question => {
    if (question.length <= 44) this.setState({ question });
  };
  onAnswerChanged = answer => {
    if (answer.length <= 144) this.setState({ answer });
  };

  render = () => (
    <View>
      <View>
        <Text>
          Add cards to deck {this.props.navigation.state.params.title}
        </Text>

        <Text>Question:</Text>
        <TextInput
        value={this.state.question}
        style={{height: 40}}
        placeholder="Type here a question!"
        onChangeText={this.onQuestionChanged}
        />
        <Text>{this.state.question.length}/44</Text>
        <Text>Answer:</Text>
        <TextInput
        value={this.state.answer}
        style={{height: 40}}
        placeholder="Type here a answer!"
        onChangeText={this.onAnswerChanged}
        />
        <Text>{this.state.answer.length}/144</Text>
        <TouchableOpacity onPress={this.onAdd}>
          <Text>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
