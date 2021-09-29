import React, { useState, useRef, } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Card from './Card'



const Home = () => {
  const [text, setText] = useState('text default')
  const todoNameRef = useRef()

  const handleTransform = (event) => {
    event.preventDefault()
    console.log("forever")
    // const text = todoNameRef.current.value
    // if (text === '') return
    // setText(text)
    // todoNameRef.current.value = null
  }

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" onSubmit={handleTransform} >
          <Form.Label>Вставьте текст в форму</Form.Label>
          <Form.Control as="textarea" rows={10} />
          <Button type="submit">Transform</Button>
        </Form.Group>
      </Form>

      <h3>{text}</h3>
    </div>
  )
}

const Notes = () => (
  <div> <h2>Notes</h2> </div>
)

const Users = () => (
  <div> <h2>Users</h2> </div>
)

const App = () => {
  const padding = {
    padding: 5
  }

  return (
    <Container>
      <h1>DECKS APP</h1>
      <Router>
        <Container>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/decks">Мои колоды</Link>
          <Link style={padding} to="/users">Log out</Link>
        </Container>

        <Switch>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </Router>
    </Container>
  )
}

export default App;