import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import deckReducer from './reducers/deckReducer'
//import filterReducer from './reducers/filterReducer'

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// })

const store = createStore(
    deckReducer,
    applyMiddleware(thunk)
)

export default store