import axios from "axios"
import React, { useState, useEffect } from "react"
import CardPage from "./CardPage"
import Deck from "./Deck"
import { observer } from "mobx-react-lite"

async function callAPI(id, wordGroup) {
    await axios.put(`http://localhost:8080/api/v1/word/${id}/${wordGroup}`)
}
function useForceUpdate() {
    const [value, setValue] = useState(0) // integer state
    return () => setValue((value) => value + 1) // update the state to force render
}

function LearnNewApp({ deck, handleDecksChange }) {
    let words = deck.words.filter((x) => x.wordGroup === "newLearning")
    const forceUpdate = useForceUpdate()

    useEffect(() => {
        let unsubscribed = false
        if (words.length < 10) {
            let unseenWords = deck.words.filter(
                (x) => x.wordGroup === "newUnseen"
            )
            for (
                let i = 0;
                i < 10 - words.length && i < unseenWords.length;
                i++
            ) {
                let wordUnseenToLearning = unseenWords[i]
                wordUnseenToLearning.wordGroup = "newLearning"
                callAPI(wordUnseenToLearning.id, "newLearning")
                if (!unsubscribed) handleDecksChange(wordUnseenToLearning)
            }
        }
        return () => (unsubscribed = true)
    }, [])

    function memorized(word) {
        callAPI(word.id, "first")
        let wordLearningToFirst = {
            ...word,
            wordGroup: "first",
        }
        handleDecksChange(wordLearningToFirst)
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

export default observer(LearnNewApp)
