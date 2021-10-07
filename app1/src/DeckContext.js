import React, { userReducer, createContext, useCallback } from 'react'

const ADD_WORD = 'ADD_WORD'
const LOAD_DECKS = 'LOAD_DECKS'
const UPDATE_WORD = 'UPDATE_WORD'

const reducer = (state, action) => {
    if (action.type === ADD_WORD) {
        return state
    }
    if (action.type === LOAD_DECKS) {
        return state
    }
    if (action.type === UPDATE_WORD) {
        return state
    }
}

export const DeckProvider = () => {
    const [decks, setDecks] = userReducer(reducer, [])
    const addWord = useCallback()
}