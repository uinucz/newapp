import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link, useParams
} from "react-router-dom"
import SplitPane from 'react-split-pane'
import Home from './Home'
import Sidebar from './Sidebar'
import Deck from './Deck'


export default function Decks() {
    const [decks, setDecks] = useState([{ name: 'firstDeck', id: 1, words: ["hello", "dog", "england", "day"] }, { name: "secondDeck", id: 2, words: ["bye", "dog", "england", "day"] }, { name: "thirdDeck", id: 3, words: ["good evening", "dog", "england", "day"] }])
    const { id } = useParams()
    const [chosenDeck, setChosenDeck] = useState(1)

    function handleChosenDeck(id) {
        setChosenDeck(id)
    }


    return (
        <Router>
            <SplitPane
                split="vertical"
                minSize={100}
                defaultSize={300}
                allowResize={false}

            >
                <menu>
                    <Sidebar decks={decks} handleChosenDeck={handleChosenDeck} />
                </menu>

                <Route path="/decks/:id">
                    <SplitPane
                        split="vertical"
                        minSize={100}
                        defaultSize={300}
                        allowResize={false}
                    >

                        <Deck card={decks[chosenDeck - 1]} />

                        <div>
                            {decks.map(x => <Route exact path="/" component={Home} />)}
                            <Route exact path="/" component={Home} />
                            <Route path="/topics" component={Home} />
                        </div>
                    </SplitPane>
                </Route>


            </SplitPane>
        </Router>

    )
}
