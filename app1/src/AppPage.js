import React, { useState, useEffect } from "react";
import {Card, Button, Alert} from 'react-bootstrap'


export default function AppPage({deck}) {
    const [currentWord, setCurrentWord] = useState(deck.words[0])
    const [definition, setDefinition] = useState(false)
    useEffect(()=>{
        setCurrentWord(deck.words[0])
    }, [deck])
    return(
        <Card style={{ width: '20rem' }}>
            <Card.Body>
                <Card.Title>{currentWord}</Card.Title>
                <Card.Text>
                    {deck.name}
                </Card.Text>
                {definition ? <p>определение</p> : 
                <Alert onClick={()=>setDefinition(currentWord => !currentWord)}>{"        "}</Alert>}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="primary">не помню</Button>
                <Button variant="success">помню</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

