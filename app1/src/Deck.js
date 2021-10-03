import React from 'react'
import { Container, Alert, Button, Card } from 'react-bootstrap'
import { nanoid } from 'nanoid'


export default function Deck({ deck, handleShowAppChange }) {
    return (
        <Card style={{ width: '20rem', height: '25rem' }} border="primary" >
            <Card.Body>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="primary" onClick={handleShowAppChange}>новые слова  </Button>
                    <Button variant="success" onClick={handleShowAppChange}>повторение</Button>
                </div>
                <Alert variant="light">
                    <h1>{deck.name}</h1>
                    {deck.words.map(word => <p key={nanoid()}>{word}</p>)}
                </Alert>
            </Card.Body>
        </Card>
    )
}
