import React, { useState, useRef, } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Card from './Card'

function HomeInput(props){
  return(
    <>
      <Form  onSubmit={props.handleTransform} >
        <Form.Group className="mb-3">
          <Form.Label>Вставьте текст в форму</Form.Label>
          <Form.Control as="textarea" rows={10}  onChange={props.handleChange}  />
          <Button type="submit">Transform</Button>
        </Form.Group>
      </Form>
      <h3>{props.text}</h3>
    </>
  )
}
const HomeTransformed = () => {
  return(<>HomeTransformed</>)
}
function Home(){
  const [text, setText] = useState(null)
  const [transformed, setTransformed] = useState(false)
  const todoNameRef = useRef()
  const handleTransform = (e) => {
    e.preventDefault()
    console.log("handletransform")
  }

  const handleChange = (event) => {
    setText(event.target.value)
  }
  return <HomeInput props={text, handleChange,  handleTransform}/>
  // if (transformed) {
  //   return <HomeInput {copiedText, handleChange, handleTransform}/>
  // }
  // return <HomeTransformed />
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