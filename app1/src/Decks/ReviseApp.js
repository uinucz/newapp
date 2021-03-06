import axios from "axios"
import React, { useState, useEffect } from "react"
import CardPage from "./CardPage"
import Deck from "./Deck"
import { observer } from "mobx-react-lite"
import { store, StoreContext, useStore } from "../store"

async function callAPI(id, wordGroup) {
    await axios.put(`http://localhost:8080/api/v1/word/${id}/${wordGroup}`)
}
function useForceUpdate() {
    const [value, setValue] = useState(0) // integer state
    return () => setValue((value) => value + 1) // update the state to force render
}

function ReviseApp({ deck, handleDecksChange }) {
    let words = deck.words.filter((word) => word.statusRepeating === true)
    const forceUpdate = useForceUpdate()

    function memorized(word) {
        let newGroup
        switch (word.wordGroup) {
            case "first":
                newGroup = "second"
                break
            case "second":
                newGroup = "third"
                break
            case "third":
                newGroup = "learnt"
                break
            default:
                break
        }
        callAPI(word.id, newGroup)
        let wordLearningToFirst = {
            ...word,
            wordGroup: newGroup,
            statusRepeating: false,
        }
        handleDecksChange(wordLearningToFirst)
        forceUpdate()
    }

    function showAgain() {
        forceUpdate()
    }

    if (words.length !== 0)
        return (
            <CardPage
                words={words}
                leftButtonFunc={memorized}
                rightButtonFunc={showAgain}
            />
        )
    else {
        return <Deck deck={deck}></Deck>
    }
}

export default observer(ReviseApp)
