import React, { useState } from 'react'
import { ListGroup, Container, Card } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"
import { nanoid } from 'nanoid'

export default function Sidebar({ decks, handleChosenDeck }) {
    console.log('sidebar')
    return (
        <Card style={{ width: '10rem', height: '25rem' }} className="border-0" >
            <ListGroup variant="flush" >
                {decks.map(deck =>
                    <ListGroup.Item key={nanoid()}>
                        <Link to={`/decks/${deck.id}`} onClick={() => handleChosenDeck(deck.id)} >
                            {deck.name}
                        </Link>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    )
}
