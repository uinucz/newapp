import React from "react";
import LearnNewApp from "./LearnNewApp";
import ReviseApp from "./ReviseApp";


export default function AppPage({ mode, deck, handleDecksChange, handleShowAppChange }) {
    console.log("apppage", mode)

    if (mode === "new")
        return <LearnNewApp handleDecksChange={handleDecksChange} deck={deck} handleShowAppChange={handleShowAppChange} />

    else return <ReviseApp handleDecksChange={handleDecksChange} deck={deck} handleShowAppChange={handleShowAppChange} />
}

