import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch, Route, Link, useParams
} from "react-router-dom"
import SplitPane from 'react-split-pane'
import Home from './Home'
import Sidebar from './Sidebar'
import Deck from './Deck'
import AppPage from './AppPage'

const pagePadding = {
    padding: 40,
}

export default function Decks() {
    const [decks, setDecks] = useState([{ name: 'firstDeck', id: 1, words: ["hello", "dog", "england", "day"] }, { name: "secondDeck", id: 2, words: ["bye", "dog", "england", "day"] }, { name: "thirdDeck", id: 3, words: ["good evening", "dog", "england", "day"] }])
    const { id } = useParams()
    const [chosenDeck, setChosenDeck] = useState(null)
    const [showApp, setShowApp] = useState(false)

    function handleShowAppChange() {
        setShowApp(showApp => !showApp)
    }
    function handleChosenDeck(id) {
        setChosenDeck(id)
        setShowApp(false)
    }
    return (

        <Container style={{ display: 'flex', flexDirection: 'row' }}>
            <Router >

                <Sidebar decks={decks} handleChosenDeck={handleChosenDeck} />


                {chosenDeck ?
                    <>
                        {showApp
                            ?
                            <AppPage deck={decks[chosenDeck - 1]} handleShowAppChange={handleShowAppChange} />
                            :
                            <Deck deck={decks[chosenDeck - 1]} handleShowAppChange={handleShowAppChange} />
                        }
                    </>
                    :
                    <><h1>Выберите колоду</h1></>
                }

            </Router>
        </Container>

    )

    // return (
    //     <Container style={pagePadding}>
    //         <Router>
    //             <SplitPane
    //                 split="vertical"
    //                 minSize={100}
    //                 defaultSize={300}
    //                 allowResize={false}

    //             >
    //                 <Sidebar decks={decks} handleChosenDeck={handleChosenDeck} />

    //                 <Route path="/decks/:id">
    //                     {chosenDeck ?
    //                         <SplitPane
    //                             split="vertical"
    //                             minSize={100}
    //                             defaultSize={300}
    //                             allowResize={false}
    //                         >

    //                             <Deck deck={decks[chosenDeck - 1]} />

    //                             <AppPage deck={decks[chosenDeck - 1]} />

    //                         </SplitPane>
    //                         :
    //                         <><h1>Выберите колоду</h1></>
    //                     }
    //                 </Route>


    //             </SplitPane>
    //         </Router>
    //     </Container>

    // )
}
