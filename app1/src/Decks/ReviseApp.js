import axios from 'axios'
import React, { useState } from 'react'
import CardPage from './CardPage'
import Deck from './Deck'

async function callAPI(id, wordGroup) {
    await axios.put(`http://localhost:8080/api/v1/word/${id}/${wordGroup}`)
}
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function ReviseApp({ deck, handleShowAppChange, handleDecksChange  }) {
    let words = deck.words.filter(word => word.wordGroup === ("first" || "second" || "third"))
    const forceUpdate = useForceUpdate();

    console.log("revise app")


    function memorized(word) {
        let newGroup
        switch (word.wordGroup) {
            case 'first':
                newGroup = 'second'
                break
            case 'second':
                newGroup = 'third'
                break          
            case 'third':
                newGroup = 'learnt'
                break
            default:
                break
        }
        callAPI(word.id, newGroup)
        let wordLearningToFirst = {
            ...word, wordGroup: newGroup
        }
        handleDecksChange(wordLearningToFirst)
    }

    function showAgain() {
        forceUpdate()
    }

    if (words.length !== 0) return (
        <CardPage words={words} handleShowAppChange={handleShowAppChange} leftButtonFunc={memorized} rightButtonFunc={showAgain} />
    )
    else return (<Deck  deck={deck} handleShowAppChange={handleShowAppChange} ></Deck>)
}
