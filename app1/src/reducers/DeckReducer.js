import deckService from '../services/decks'

const deckReducer = (state = [], action) => {
    switch(action.type) {
      case 'INIT_DECKS':
        return action.data
      default:
        return state
    }
  }
  
export const initializeNotes = () => {
  return async dispatch => {
    const decks = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: decks,
    })
  }
}

export default deckReducer