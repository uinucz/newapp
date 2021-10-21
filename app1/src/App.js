import React, { useState, useRef, useEffect, useCallback } from "react"
import {
    Alert,
    Popover,
    OverlayTrigger,
    Form,
    Container,
    Button,
    Spinner,
} from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Home from "./Index/Home"
import Decks from "./Decks/Decks"

const pagePadding = {
    padding: 40,
}
const padding = {
    padding: 30,
}

const App = () => {
    console.log("app")
    return (
        <Container style={pagePadding}>
            <h1>DECKS APP</h1>
            <Router>
                <Container style={padding}>
                    <Link style={padding} to="/">
                        Home
                    </Link>
                    <Link style={padding} to="/decks">
                        Мои колоды
                    </Link>
                </Container>

                <Switch>
                    <Route path="/users">
                        <Home />
                    </Route>
                    <Route path="/decks">
                        <Decks />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </Container>
    )
}

export default App
