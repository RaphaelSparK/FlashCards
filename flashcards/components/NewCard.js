import React from 'react';
import { AsyncStorage, Alert, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import { addCardToDeck } from '../utils/api';
import { backColor,okColor } from '../utils/colors'

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
      this.state.question.length > 50
    )
      return Alert.alert(
        'Invalid Question',
        'Maximum question size is 50 character and minimum is 1',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    if (
      !this.state.answer ||
      this.state.answer.trim().length === 0 ||
      this.state.answer.length > 150
    )
      return Alert.alert(
        'Invalid  Answer',
        'Response must be between 1 and 150 characters and minimum is 1',
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
    if (question.length <= 50) this.setState({ question })
  }

  onAnswerChanged = answer => {
    if (answer.length <= 150) this.setState({ answer })
  };

  render = () => (
    <View style={styles.container}>
      <View>
        <Text  style={styles.title}>
          Add cards to deck:  {this.props.navigation.state.params.title}
        </Text>
        <Text style={styles.cardInfo}>Question:</Text>
        <TextInput
        value={this.state.question}
        style={styles.txtInput}
        placeholder="Type here a question!"
        onChangeText={this.onQuestionChanged}
        />
        <Text style={styles.count} >{this.state.question.length}/50</Text>
        <Text style={styles.cardInfo}>Answer:</Text>
        <TextInput
        value={this.state.answer}
        style={styles.txtInput}
        placeholder="Type here a answer!"
        onChangeText={this.onAnswerChanged}
        />
        <Text  style={styles.count}>{this.state.answer.length}/150</Text>
      </View>
      <View>
        <TouchableOpacity style={[styles.btnOk,styles.btnBig]} onPress={this.onAdd}>
          <Text style={styles.textBtn}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnBack,styles.btnBig]} onPress={this.onCancel}>
          <Text style={styles.textBtn}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
  count: {
    alignSelf: 'flex-end',
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
  cardInfo: {
    fontSize: 18,
  }
  ,
  btnBack: {
    backgroundColor: backColor,
  },
  btnOk: {
    backgroundColor: okColor,
  }
});
