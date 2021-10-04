import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from 'react-bootstrap'
import LearnNewApp from "./LearnNewApp";
import ReviseApp from "./ReviseApp";


export default function AppPage({ mode, deck, handleDecksChange, handleShowAppChange }) {
    console.log("appage", mode)

    if (mode == "new")
        return <LearnNewApp handleDecksChange={handleDecksChange} deck={deck} handleShowAppChange={handleShowAppChange} />

    else return <ReviseApp handleDecksChange={handleDecksChange} deck={deck} handleShowAppChange={handleShowAppChange} />
}

