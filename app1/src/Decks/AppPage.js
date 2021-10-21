import React from "react"
import LearnNewApp from "./LearnNewApp"
import ReviseApp from "./ReviseApp"
import { observer } from "mobx-react-lite"
import { useStore } from "../store"

function AppPage({ deck, handleDecksChange }) {
    const { appStore } = useStore()

    if (appStore.mode === "new")
        return <LearnNewApp handleDecksChange={handleDecksChange} deck={deck} />
    else return <ReviseApp handleDecksChange={handleDecksChange} deck={deck} />
}
export default observer(AppPage)
