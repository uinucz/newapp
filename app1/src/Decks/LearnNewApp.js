import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CardPage from './CardPage'

async function callAPI(id, wordGroup) {
    await axios.put(`http://localhost:8080/api/v1/word/${id}/${wordGroup}`)
}

export default function LearnNewApp({ deck, handleShowAppChange, handleDecksChange }) {
    let words = deck.words.filter(x => x.wordGroup == "newLearning")

    useEffect(() => {
        let unsubscribed = false;
        if (words.length < 10) {
            let vacant = 10 - words.length
            let newDeck = JSON.parse(JSON.stringify(deck))
            let unseenWords = newDeck.words.filter(x => x.wordGroup === "newUnseen")
            for (let i = 0; i < vacant && i < unseenWords.length; i++) {
                let wordUnseenToLearning = unseenWords[i]
                wordUnseenToLearning.wordGroup = "newLearning"
                callAPI(wordUnseenToLearning.id, "newLearning")
                if (!unsubscribed) handleDecksChange(wordUnseenToLearning)
            }
        }
        return () => unsubscribed = true;
    }, [])

    function memorized(word) {
        callAPI(word.id, "first")
        let wordLearningToFirst = {
            ...word, wordGroup: "first"
        }
        handleDecksChange(wordLearningToFirst)
    }
    function showAgain() {
    }

    if (words != []) return (
        <CardPage words={words} handleShowAppChange={handleShowAppChange} leftButtonFunc={memorized} rightButtonFunc={showAgain} />
    )
}
