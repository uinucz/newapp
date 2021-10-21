import React, { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router } from "react-router-dom"
import Sidebar from "./Sidebar"
import Deck from "./Deck"
import AppPage from "./AppPage"
import axios from "axios"
import { observer } from "mobx-react-lite"
import { useStore } from "../store"

function Decks() {
    const [decks, setDecks] = useState([])
    const [chosenDeck, setChosenDeck] = useState(null)
    const { appStore } = useStore()

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

    function handleChosenDeck(id) {
        setChosenDeck(id)
        appStore.hide()
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
                        {appStore.showState ? (
                            <AppPage
                                handleDecksChange={handleDecksChange}
                                deck={decks.find((x) => x.id === chosenDeck)}
                            />
                        ) : (
                            <Deck
                                deck={decks.find((x) => x.id === chosenDeck)}
                            />
                        )}
                    </>
                ) : (
                    <h1>Выберите колоду</h1>
                )}
            </Router>
        </Container>
    )
}

export default observer(Decks)
