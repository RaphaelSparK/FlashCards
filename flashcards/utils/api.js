import {
  AsyncStorage
} from 'react-native'
const STORAGE = 'FLASHCARDS'

export const getDecks = () =>
  AsyncStorage.getItem(STORAGE)
    .then(item => JSON.parse(item))
    .catch(ex => console.error(ex))

export const getDeck = id =>
  AsyncStorage.getItem(STORAGE)
    .then(item => JSON.parse(item)[id])
    .catch(ex => console.error(ex))

export const saveDeckTitle = title => {
  return getDecks()
    .then(decks => {
      const newDecks = { ...decks,
        [title]: {
          title,
          questions: []
        }
      }
      return AsyncStorage.setItem(STORAGE, JSON.stringify(newDecks))
    })
    .catch(ex => console.error(ex))
}

export const addCardToDeck = (title, card) => {
  return getDecks()
    .then(decks => {
      if (decks && decks[title]) {
        decks[title].questions.push(card)
        AsyncStorage.setItem(STORAGE, JSON.stringify(decks))
      }
    })
    .catch(ex => console.error(ex))
}
