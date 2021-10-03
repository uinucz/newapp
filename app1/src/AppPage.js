import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from 'react-bootstrap'


export default function AppPage({ deck, handleShowAppChange }) {
    const [currentWord, setCurrentWord] = useState(deck.words[0])
    const [definition, setDefinition] = useState(false)
    useEffect(() => {
        setCurrentWord(deck.words[0])
    }, [deck])
    return (
        <Card style={{ width: '20rem', height: '25rem' }} border="primary" >
            <Card.Body>
                <Card.Title>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {currentWord}
                        <Button variant="outline-dark" onClick={handleShowAppChange}>назад</Button>
                    </div>

                </Card.Title>
                <Card.Text>
                    {deck.name}
                </Card.Text>
                {definition ? <p>определение</p> :
                    <Alert onClick={() => setDefinition(currentWord => !currentWord)}>{"        "}</Alert>}
            </Card.Body>

            <Card.Footer className="bg-transparent border-0 ">
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 3 }}  >
                    <Button variant="primary">не помню</Button>
                    <Button variant="success">помню</Button>
                </div>
            </Card.Footer>
        </Card>
    )
}

