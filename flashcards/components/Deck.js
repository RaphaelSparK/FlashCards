import React from 'react';
import { AsyncStorage, View, Text, TouchableOpacity, StyleSheet  } from 'react-native';
import { getDeck } from '../utils/api';
import { backColor,okColor, newColor } from '../utils/colors'

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
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{this.props.navigation.state.params.title}</Text>
        <Text style={styles.cardInfo}>{this.state.cards} cards</Text>
      </View>
      <View>
        <TouchableOpacity style={[styles.btnOk,styles.btnBig]} onPress={this.onPlay}>
          <Text style={styles.textBtn}>Start a Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnNew,styles.btnBig]} onPress={this.onAdd}>
          <Text style={styles.textBtn}>Create New Question</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnBack,styles.btnBig]} onPress={this.onBackPress}>
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
  textBtn: {
    color: 'white',
    fontSize: 24
  },
  cardInfo: {
    fontSize: 18,
    alignSelf: 'center',
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
  ,
  btnNew: {
    backgroundColor: newColor,
  }
});