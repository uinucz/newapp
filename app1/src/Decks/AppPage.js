import React from "react"
import LearnNewApp from "./LearnNewApp"
import ReviseApp from "./ReviseApp"

export default function AppPage({
    mode,
    deck,
    handleDecksChange,
    handleShowAppChange,
    handleSetShowApp,
}) {
    console.log("apppage", mode)

    if (mode === "new")
        return (
            <LearnNewApp
                handleSetShowApp={handleSetShowApp}
                handleDecksChange={handleDecksChange}
                deck={deck}
                handleShowAppChange={handleShowAppChange}
            />
        )
    else
        return (
            <ReviseApp
                handleSetShowApp={handleSetShowApp}
                handleDecksChange={handleDecksChange}
                deck={deck}
                handleShowAppChange={handleShowAppChange}
            />
        )
}
