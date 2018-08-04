import React from 'react';
import { AsyncStorage, View, Text, TouchableOpacity, ScrollView, ProgressBarAndroid, Platform, StyleSheet } from 'react-native';

import {
  getDeck
} from '../utils/api';

import {
  clearLocalNotifications,
  setLocalNotification
} from '../utils/helpers';

import { correctColor, wrongColor,backColor,okColor,newColor } from '../utils/colors'
export default class PlayDeck extends React.Component {
  state = { 
    questions: [],
    cardsCount: 0,
    corrects: 0,
    wrongs: 0,
    currentIndex: 0,
    showQuestion: true
   };

  static navigationOptions = ({ navigation }) =>  {return { title: navigation.state.params.title };}

  componentDidMount = () => {
    this.fetchDeck();
  };

  fetchDeck = () =>
    getDeck(this.props.navigation.state.params.title)
      .then(deck =>
        this.setState({
          questions: deck.questions,
          cardsCount: deck.questions.length
        })
      )
      .catch(err => console.error(err));

  onCorrect = () =>
    this.setState({      
      corrects: this.state.corrects + 1,
      showQuestion: true,
      currentIndex: this.state.currentIndex + 1
    });

  onWrong = () =>
    this.setState({      
      wrongs: this.state.wrongs + 1,
      showQuestion: true,
      currentIndex: this.state.currentIndex + 1
    });

  onRestart = () => {
    this.setState({
      questions: [],
      cardsCount: 0,
      corrects: 0,
      wrongs: 0,
      currentIndex: 0,
      showQuestion: true
    });
    this.fetchDeck();
  };

  renderScore = () => (
    <View>
    {this.state.questions.length > this.state.currentIndex && (
      <View>
        <View>
          <Text>
            Question {this.state.currentIndex + 1} of {this.state.cardsCount}
          </Text>
          {Platform.OS === 'android' && (<ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={this.state.currentIndex / this.state.questions.length}
          />)}
        </View>
        <View style={styles.results}>
          <Text style={styles.txtCorrect}>
            {this.state.corrects} correct{this.state.corrects > 1 && 's'}
          </Text>
          <Text>/</Text>
          <Text style={styles.txtWrong}>
            {this.state.wrongs} wrong{this.state.wrongs > 1 && 's'}
          </Text>
        </View>
      </View>
    )}
    </View>
)

  renderQuestion = question => (
    <View style={{flex:1,justifyContent : 'space-between'}}>
      <View>
        {this.renderScore()}
      </View>
      <View>
        <Text  style={{fontWeight:'bold'}}>Question:</Text>
        <Text style={styles.question}>
          {this.state.questions.length <= this.state.currentIndex
            ? '-'
            : this.state.questions[this.state.currentIndex].question}
        </Text>
      </View>
      <View>
        <TouchableOpacity style={[styles.btnOk,styles.btnBig]} onPress={() => this.setState({ showQuestion: false })}>
            <Text style={styles.textBtn}>See Answer</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  renderAnwser = anwser => (
    <View style={{flex:1,justifyContent : 'space-between'}}>
      <View>
        {this.renderScore()}
      </View>
      <View>
        <Text style={{fontWeight:'bold'}}>Question:</Text>
        <Text style={styles.question}>
          {this.state.questions.length <= this.state.currentIndex
            ? '-'
            : this.state.questions[this.state.currentIndex].question}
        </Text>
      </View>
      <View>
        <Text style={{fontWeight:'bold'}}>Answer:</Text>
        <Text style={styles.answer}>
          {this.state.questions.length <= this.state.currentIndex
            ? '-'
            : this.state.questions[this.state.currentIndex].answer}
        </Text>
      </View>
      <View>
        <TouchableOpacity style={[styles.btnOk,styles.btnBig]} onPress={this.onCorrect}>
          <Text style={styles.textBtn}>Correct!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnBack,styles.btnBig]} onPress={this.onWrong}>
          <Text style={styles.textBtn}>Incorrect!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  showResult = () => {
    if (this.state.cardsCount > 0) {
        clearLocalNotifications()
        .then(setLocalNotification)
        .catch(err => console.error(err));

      return (
        <View style={{flex:1,justifyContent : 'space-between'}}>
          <View >
            <Text style={styles.finish}>Finish!</Text>
            <Text style={[styles.txtCorrect, styles.txtFinish]}>Correct Answers: {this.state.corrects}</Text>
            <Text style={[styles.txtWrong, styles.txtFinish]}>Wrong Answers: {this.state.wrongs}</Text>
          </View>
          <View>
            <TouchableOpacity style={[styles.btnNew,styles.btnBig]} onPress={this.onRestart}>
              <Text style={styles.textBtn}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnBack,styles.btnBig]} onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.textBtn}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else
      return (
        <Text>
          Add cards to play
        </Text>
      );
  };

  render = () => {
    return (
        <View  style={styles.container}>
          {this.state.questions.length <= this.state.currentIndex
            ? this.showResult()
            : this.state.showQuestion
              ? this.renderQuestion()
              : this.renderAnwser()}
        </View>
    );
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent : 'space-between',
    alignItems: 'stretch',
  },
  results: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnBig: {
    padding: 20,
    margin: 5,
    alignItems: 'center',

  },
  txtFinish: {
    alignSelf: 'center',
    fontSize: 40
  },
  textBtn: {
    color: 'white',
    fontSize: 24
  },
  btnBack: {
    backgroundColor: backColor,
  },
  btnOk: {
    backgroundColor: okColor,
  },
  txtWrong: {
    color: wrongColor,
  },
  txtCorrect: {
    color: correctColor,
  },
  btnNew: {
    backgroundColor: newColor,
  },
  answer: {
    fontSize: 30,
    padding: 20,
    backgroundColor: '#9EEBA7',
    alignSelf: 'stretch',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  question: {
    fontSize: 26,
    padding: 20,
    backgroundColor: '#F4D0CE',
    alignSelf: 'stretch',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  finish: {
    fontSize: 42,
    borderWidth: 1,
    backgroundColor: '#ffffc3',
    borderRadius: 10,
    margin: 5,
    alignSelf: 'stretch',
    textAlign: 'center'
  }
});