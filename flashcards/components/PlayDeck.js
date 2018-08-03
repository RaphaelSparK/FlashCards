import React from 'react';
import { AsyncStorage, View, Text, TouchableOpacity, ScrollView, ProgressBarAndroid, Platform } from 'react-native';

import {
  getDeck
} from '../utils/api';

import {
  clearLocalNotifications,
  setLocalNotification
} from '../utils/helpers';



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
    <Text>{this.props.navigation.state.params.title}</Text>

    <Text>
    {this.state.corrects} correct{this.state.corrects > 1 && 's'}
    </Text>
    <Text>
    {this.state.wrongs} wrong{this.state.wrongs > 1 && 's'}
    </Text>   
    
    {this.state.questions.length > this.state.currentIndex && (
      <View>
      <Text>
        Question {this.state.currentIndex + 1} of {this.state.cardsCount}
      </Text>
      {Platform.OS === 'android' && (<ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={this.state.currentIndex / this.state.questions.length}
      />)}</View>
    )}
    </View>
)

  renderQuestion = question => (    
    <View>  
      {this.renderScore()}
      <Text>
          {this.state.questions.length <= this.state.currentIndex 
            ? '-'
            : this.state.questions[this.state.currentIndex].question}
      </Text>
      <TouchableOpacity onPress={() => this.setState({ showQuestion: false })}>        
          <Text>See Answer</Text>
      </TouchableOpacity>
    </View>
  );
  renderAnwser = anwser => (
    <View>
      {this.renderScore()}
      <Text>
        {this.state.questions.length <= this.state.currentIndex
          ? '-'
          : this.state.questions[this.state.currentIndex].question}
      </Text>
      <Text>
        {this.state.questions.length <= this.state.currentIndex
          ? '-'
          : this.state.questions[this.state.currentIndex].answer}
      </Text>
      <TouchableOpacity onPress={this.onCorrect}>
        <Text>Correct!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.onWrong}>
        <Text>Wrong!</Text>
      </TouchableOpacity>
    </View>
  );

  showResult = () => {
    if (this.state.cardsCount > 0) {
        clearLocalNotifications()
        .then(setLocalNotification)
        .catch(err => console.error(err));

      return (
        <View>
          <Text>Finish!</Text>
          <Text>Correct Answers: {this.state.corrects}</Text>
          <Text>Wrong Answers: {this.state.wrongs}</Text>
          <TouchableOpacity onPress={this.onRestart}>
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
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
        <View>         
          {this.state.questions.length <= this.state.currentIndex
            ? this.showResult()
            : this.state.showQuestion
              ? this.renderQuestion()
              : this.renderAnwser()}
        </View>
    );
  };
}

