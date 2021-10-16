import React, { useState, useEffect, useReducer } from "react"
import { Container, Alert } from "react-bootstrap"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from "react-router-dom"
import Sidebar from "./Sidebar"
import Deck from "./Deck"
import AppPage from "./AppPage"
import axios from "axios"

const pagePadding = {
    padding: 40,
}

export default function Decks() {
    const [decks, setDecks] = useState([])
    const [chosenDeck, setChosenDeck] = useState(null)
    const [showApp, setShowApp] = useState(false)
    const [mode, setMode] = useState("new")
    const [_, forceUpdate] = useReducer((x) => x + 1, 0)

    console.log("showapp", showApp)

    useEffect(() => {
        function callAPI() {
            axios
                .get(`http://localhost:8080/api/v1/deck`)
                .then((response) => {
                    const body = response.data
                    setDecks(body)
                })
                .catch((error) =>
                    console.error("Failed to get definition: ", error)
                )
        }
        callAPI()
    }, [])

    function handleShowAppChange(x) {
        setMode(() => x)
        setShowApp((showApp) => !showApp)
    }
    function handleSetShowApp() {
        setShowApp((x) => {
            if (x) return false
        })
    }
    function handleChosenDeck(id) {
        setChosenDeck(id)
        forceUpdate() //test line
        setShowApp(false)
    }
    function handleDecksChange(newWord) {
        setDecks(
            decks.map((deck) =>
                deck.id === chosenDeck
                    ? {
                          ...deck,
                          words: deck.words.map((word) =>
                              word.id === newWord.id ? newWord : word
                          ),
                      }
                    : deck
            )
        )
    }
    function addDeck(deckName) {
        setDecks((decks) =>
            decks.concat({ name: deckName, id: decks.length + 1, words: [] })
        )
    }

    return (
        <Container style={{ display: "flex", flexDirection: "row" }}>
            <Router>
                {decks ? (
                    <Sidebar
                        decks={decks}
                        handleChosenDeck={handleChosenDeck}
                        addDeck={addDeck}
                    />
                ) : (
                    <h1>Загрузка</h1>
                )}

                {chosenDeck ? (
                    <>
                        {showApp ? (
                            <AppPage
                                mode={mode}
                                handleDecksChange={handleDecksChange}
                                deck={decks.find((x) => x.id === chosenDeck)}
                                handleShowAppChange={handleShowAppChange}
                                handleSetShowApp={handleSetShowApp}
                            />
                        ) : (
                            <Deck
                                handleSetShowApp={handleSetShowApp}
                                deck={decks.find((x) => x.id === chosenDeck)}
                                handleShowAppChange={handleShowAppChange}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <h1>Выберите колоду</h1>
                    </>
                )}
            </Router>
        </Container>
    )
}
