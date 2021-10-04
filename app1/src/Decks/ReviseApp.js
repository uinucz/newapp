import axios from 'axios'
import React, { useState } from 'react'
import CardPage from './CardPage'

export default function ReviseApp({ deck, handleShowAppChange }) {
    const words = deck.words.filter(word => word.wordGroup === ("first" || "second" || "third"))
    function memorized() {
    }
    function showAgain() {

    }

    return (
        <CardPage words={words} handleShowAppChange={handleShowAppChange} leftButtonFunc={memorized} rightButtonFunc={showAgain} />
    )
}
