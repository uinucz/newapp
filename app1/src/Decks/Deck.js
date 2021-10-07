import React, {useState} from 'react'
import { Container, Alert, Button, Card, ProgressBar } from 'react-bootstrap'
import { nanoid } from 'nanoid'


export default function Deck({ deck, handleShowAppChange }) {
    

    console.log('deck')

    const occurrences = deck.words.map(x => x.wordGroup).reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, { "newUnseen": 0, "newLearning": 0, "first": 0, "second": 0, "third": 0, "learnt": 0 })

    const learnt = occurrences.learnt
    const newWords = occurrences.newLearning + occurrences.newUnseen
    const repeating = occurrences.first + occurrences.second + occurrences.third
    const all = learnt + newWords + repeating

    console.log(repeating)

    return (
        <Card style={{ width: '20rem' }} border="primary" className="overflow-auto" >
            <Card.Header className="bg-transparent border-0">
                <ProgressBar variant="info" >
                    <ProgressBar now={newWords} max={all} key={1} />
                    <ProgressBar variant="warning" now={repeating} max={all} key={2} />
                    <ProgressBar variant="success" now={learnt} max={all} key={3} />
                </ProgressBar>
            </Card.Header>
            <Card.Body>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant={newWords > 0 ? "primary" : "outline-dark"} onClick={newWords > 0 ? () => handleShowAppChange("new") : () => { }}>новые слова  </Button>
                    <Button variant={deck.showWordsToRevise ? "warning" : "outline-dark"} onClick={repeating > 0 ? () => handleShowAppChange("revise") : () => { }}>повторение</Button>
                </div>
                <Alert variant="light" className="mb-0 pb-0">
                    <h1>{deck.name}</h1>
                    {deck.words.map(word => <span key={nanoid()}>{word.body}<br/> </span>)}
                </Alert>
            </Card.Body>
        </Card>
    )
}
