import React, { useState, useRef, useEffect, useCallback } from 'react'
//import { uuid, v4 } from 'uuidv4';
import axios from 'axios'
import { Form, Container, Alert, Popover, Button, OverlayTrigger, Spinner } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const uuid = function b(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b) }
function identifyWords(text) {
  // split input text into words with unique Ids
  const words = text
    .split(/ +/)
    .map(word => {
      const cleanedWord = word
        .replace(/^["]+/, "")     // remove leading punctuation
        .replace(/[.,!?"]+$/, "") // remove trailing punctuation

      return { word: cleanedWord, original: word, uuid: uuid() }
    });

  // attach the source text to the array of words
  // we can use this to prevent unnecessary rerenders
  words.text = text;

  // return the array-object
  return words;
}

function HomeInput({ text, handleChange, handleTransform }) {
  return (
    <>

      <Form onSubmit={handleTransform} >
        <Form.Group className="mb-3">
          <Form.Label><h4>Вставьте текст в форму</h4></Form.Label>
          <Form.Control as="textarea" rows={10} onChange={handleChange} />
          <br />
          <Button type="submit">далее</Button>
        </Form.Group>
      </Form>
    </>
  )
}

const HomeTransformed = ({ handleTransform, text }) => {
  const [selectedWord, setSelectedWord] = useState("luminous")
  const [apiData, setApiData] = useState(null)

  const [words, _setWords] = useState(() => identifyWords("He looked at her and saw her eyes luminous with pity."));


  const words = text.split(/ /g)
  const padding = {
    cursor: "pointer"
  }

  useEffect(() => {
    async function callTheApi() {
      const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + selectedWord;
      try {
        const response = await axios.get(url)
        setApiData(response.data)
        console.log(response.data)
      } catch (e) {
        console.log("Error", e.message);
      }
    }
    callTheApi();
  }, [selectedWord]);


  function clickCallback(w) {
    var word = w.split(/[.!?,]/g)[0]
    setSelectedWord(word)
    console.log(selectedWord)
  }

  const popover = (
    <Popover id="popover-basic" variant="secondary" style={{ margin: 0 }}>
      <Popover.Body>
        {
          apiData ?
            (<div>
              <h1>{apiData[0].word}</h1>
              <h6>{apiData[0].phonetics[0].text}</h6>
              <h6>{apiData[0].meanings[0].definitions[0].definition}</h6>
              <h6><i>{apiData[0].meanings[0].definitions[0].example}</i></h6>
              <div>
                <Button >Добавить в колоду</Button>
              </div>
            </div>) :
            (<div>
              <Spinner animation="border" />
            </div>)
        }
      </Popover.Body>
    </Popover>
  )

  return (
    <>
      <Alert variant='light'>
        {
          words.map(w =>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose  >
              {/* <OverlayTrigger key={uuid()} trigger="click" placement="bottom" overlay={popover} rootClose  ></OverlayTrigger> */}
              <span style={padding} onClick={() => clickCallback(w)} > {w}</span>
            </OverlayTrigger>
          )
        }
      </Alert>
      <div>
        <Button onClick={handleTransform}>назад</Button>
      </div>
    </>
  )
}

function Home() {
  const [text, setText] = useState("He looked at her and saw her eyes luminous with pity.")
  const [transformed, setTransformed] = useState(false)

  const handleTransform = (e) => {
    e.preventDefault()
    setTransformed(transformed => !transformed)
    console.log("handletransform " + transformed)
  }

  const handleChange = (event) => {
    setText(event.target.value)
    console.log("handleChange")
  }

  if (transformed) {
    return <HomeInput text={text} handleChange={handleChange} handleTransform={handleTransform} />
  }
  return <HomeTransformed text={text} handleTransform={handleTransform} />
}

const App = () => {
  const padding = {
    padding: 30,
  }
  const pagePadding = {
    padding: 40,
  }
  return (
    <Container style={pagePadding} >
      <h1 >DECKS APP</h1>
      <Router>
        <Container>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/decks">Мои колоды</Link>
          <Link style={padding} to="/users">Log out</Link>
        </Container>

        <Switch>
          <Route path="/notes">
            <Home />
          </Route>
          <Route path="/users">
            <Home />
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