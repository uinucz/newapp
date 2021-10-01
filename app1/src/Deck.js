import React from 'react'
import { Container, Alert, Button } from 'react-bootstrap'

export default function Deck({ deck }) {
    return (
        <Container>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="primary">новые слова  </Button>
                <Button variant="success">повторение</Button>
                </div>
         <Alert variant="light">
            <h1>{deck.name}</h1>
            {deck.words.map(word => <p>{word}</p>)}
        </Alert>
        </Container>
    )
}
