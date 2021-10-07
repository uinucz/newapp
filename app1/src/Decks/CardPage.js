import React, { useState, useEffect, useRef, Fragment } from "react";
import { Card, Button, Alert } from 'react-bootstrap'


export default function CardPage({ words, handleShowAppChange, leftButtonFunc, rightButtonFunc }) {
    const [loading, setLoading] = useState(true)
    const [currentWord, setCurrentWord] = useState(words[0])   
    const [showDefinition, setShowDefinition] = useState(false)
    

    useEffect(() => {
        console.log('useeffect')
        setShowDefinition(false)
            setLoading(true)
            setCurrentWord((currentWord) => {
                let x = Math.floor(Math.random() * words.length)
                if (words.length > 1)
                    while (words[x].id === currentWord.id) 
                        x = Math.floor(Math.random() * words.length)
                return words[x]
            })
            setLoading(false)
    },[words])


    return (
        <Card style={{ width: '25rem', height: '25rem' }} border="primary" >
            {!loading ?
                <Fragment>
                    <Card.Body>                
                        <Card.Title  >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h1  >{currentWord.body}</h1>
                                <Button   variant="outline-dark" onClick={handleShowAppChange}>назад</Button>
                            </div>

                        </Card.Title>
                            {currentWord.transcription}   
                        <br />
                        {
                            showDefinition ?
                                <>
                                    <h4>{currentWord.definition}</h4>
                                    <i>{currentWord.example}</i>
                                </>
                                :
                                <Alert className="mt-2" style={{ height: '11rem' }} onClick={() => setShowDefinition(showDefinition => !showDefinition)}></Alert>
                        }
                    </Card.Body>
                 
                    <Card.Footer className="bg-transparent border-0 ">
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 3 }}  >
                            <Button variant="success" onClick={() => leftButtonFunc(currentWord)}>запомнил</Button>
                            <Button variant="primary" onClick={() => rightButtonFunc(currentWord)}>показать ещё</Button>
                        </div>
                    </Card.Footer>

                </Fragment>
                :
                <p></p>    
            } 
        </Card>
    )
}

