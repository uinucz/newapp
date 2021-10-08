import React, { useState, Fragment} from 'react'
import { ListGroup, Container, Card, Button, Form} from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"
import { nanoid } from 'nanoid'
import axios from 'axios'
import NewDeckForm from './NewDeckForm'

export default function Sidebar({ decks, addDeck, handleChosenDeck }) {
    const [newDeck, setNewDeck] = useState(false)
   
    function handleNewDeck(name) {
        axios.post(`http://localhost:8080/api/v1/deck/${name}`)
            .then(res => {
            console.log(res.data);
        })
        addDeck(name)
        setNewDeck(newDeck => !newDeck)
    }

    console.log('sidebar')
    return (
        <Card style={{ width: '16rem', height: '25rem' }} className="border-0" >
            <ListGroup variant="flush" >
                {decks.map(deck =>
                    <ListGroup.Item key={nanoid()}>
                        <Link to={`/decks/${deck.id}`} onClick={() => handleChosenDeck(deck.id)} >
                            {deck.name}
                        </Link>                 
                    </ListGroup.Item>
                )}
                {newDeck
                    ?
                    <ListGroup.Item key={nanoid()}>
                        <NewDeckForm handleNewDeck={handleNewDeck} setNewDeck={setNewDeck}/>
                     </ListGroup.Item>
                    :
                     <ListGroup.Item key={nanoid()}>
                        <Button onClick={()=>setNewDeck(newDeck => !newDeck)}style={{width: '3rem'}}>+</Button>
                    </ListGroup.Item>
                }    
            </ListGroup>
        </Card>
    )
}
