import React from 'react'
import { Container, Alert } from 'react-bootstrap'

export default function Deck({ card }) {
    return (
        <Alert variant="light">
            <h1>{card.name}</h1>
            {card.words.map(word => <p>{word}</p>)}
        </Alert>
    )
}
