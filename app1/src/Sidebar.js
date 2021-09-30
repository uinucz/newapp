import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"

export default function Sidebar({ decks, handleChosenDeck }) {
    return (
        <ListGroup>
            {decks.map(deck =>
                <ListGroup.Item>
                    <Link to={`/decks/${deck.id}`} onClick={() => handleChosenDeck(deck.id)}  >
                        {deck.name}
                    </Link>
                </ListGroup.Item>
            )}
        </ListGroup>
    )
}
