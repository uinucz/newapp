import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch, Route, Link, useParams
} from "react-router-dom"
import Sidebar from './Sidebar'
import Deck from './Deck'
import AppPage from './AppPage'
import axios from 'axios'

import { initializeDecks } from './reducers/deckReducer'
import { useDispatch } from 'react-redux'

const pagePadding = {
    padding: 40,
}

export default function Decks() {
    const [decks, setDecks] = useState([])
    const [chosenDeck, setChosenDeck] = useState(null)
    const [showApp, setShowApp] = useState(false)
    const [mode, setMode] = useState("new")

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeNotes()) 
    },[dispatch]) 


    useEffect(() => {
        function callAPI() {
            axios
                .get(`http://localhost:8080/api/v1/deck`)
                .then(response => {
                    const body = response.data;
                    setDecks(body);
                })
                .catch(error =>
                    console.error("Failed to get definition: ", error)
                );
        }
        callAPI()
    }, [])

    function handleShowAppChange(x) {
        setMode(() => x)
        setShowApp(showApp => !showApp)
    }
    function handleChosenDeck(id) {
        setChosenDeck(id)
        setShowApp(false)
    }


    function handleDecksChange(newWord) {
        let newDecks = JSON.parse(JSON.stringify(decks))
        let newDeck = newDecks.find(deck => deck.id == chosenDeck)
        newDeck = newDeck.words.map(d => d.id == newWord.id ? newWord : d)
        setDecks(newDecks)
    }

    return (

        <Container style={{ display: 'flex', flexDirection: 'row' }}>
            <Router >

                {decks ?
                    <Sidebar decks={decks} handleChosenDeck={handleChosenDeck} />
                    :
                    <h1>Загрузка</h1>
                }


                {chosenDeck ?
                    <>
                        {showApp
                            ?
                            <AppPage mode={mode} handleDecksChange={handleDecksChange} deck={decks.find(x => x.id === chosenDeck)} handleShowAppChange={handleShowAppChange} />
                            :
                            <Deck deck={decks.find(x => x.id === chosenDeck)} handleShowAppChange={handleShowAppChange} />
                        }
                    </>
                    :
                    <><h1>Выберите колоду</h1></>
                }

            </Router>
        </Container>

    )


}
