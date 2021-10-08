import React, { useState, Fragment} from 'react'
import { ListGroup, Container, Card, Button, Form} from 'react-bootstrap'
import axios from 'axios'

export default function NewDeckForm({handleNewDeck, setNewDeck}) {
    const [inputValue, setInputValue] = useState('')
  
    function handleChange(event) {
        setInputValue(event.target.value)
    }
    
    return (
        <div>
            <Form >
                <Form.Control value={inputValue} onChange={handleChange}  placeholder="Название" />
                <Button  className="mt-2" onClick={inputValue !== '' ? () => handleNewDeck(inputValue) : () => {setNewDeck(newDeck=>!newDeck)}}  style={{width: '3rem'}}>+</Button>
            </Form>
        </div>
    )
}
