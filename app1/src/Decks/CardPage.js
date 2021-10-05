import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from 'react-bootstrap'


export default function CardPage({ words, handleShowAppChange, leftButtonFunc, rightButtonFunc }) {
    const [currentWord, setCurrentWord] = useState(words[0])
    const [showDefinition, setShowDefinition] = useState(false)
    console.log('cardpage', words[0].body)


    return (
        <Card style={{ width: '20rem', height: '30rem' }} border="primary" >
            <Card.Body>
                <Card.Title>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>{currentWord.body}</h1>
                        <Button variant="outline-dark" onClick={handleShowAppChange}>назад</Button>
                    </div>

                </Card.Title>
                <div>
                    
                    <b>{currentWord.transcription}</b>
                </div>
                <br />
                {
                    showDefinition ?
                        <>
                            <h4>{currentWord.definition}</h4>
                            <i>{currentWord.example}</i>
                        </>
                        :
                        <Alert style={{ height: '5rem' }} onClick={() => setShowDefinition(showDefinition => !showDefinition)}>{"        "}</Alert>
                }
            </Card.Body>

            <Card.Footer className="bg-transparent border-0 ">
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 3 }}  >
                    <Button variant="success" onClick={() => leftButtonFunc(currentWord)}>запомнил</Button>
                    <Button variant="primary" onClick={() => {
                        rightButtonFunc(currentWord)
                        console.log("dog")
                    }}>
                        показать ещё
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}

