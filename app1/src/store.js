import { useContext, createContext } from "react"
import { computed, makeAutoObservable, runInAction } from "mobx"

export class AppStore {
    showState = false
    mode = "new"

    constructor() {
        makeAutoObservable(this)
    }

    setMode = (newMode) => {
        this.mode = newMode
    }

    show = () => {
        this.showState = true
    }

    hide = () => {
        this.showState = false
    }

    toggle = () => {
        this.showState = !this.showState
    }
}

export const store = {
    appStore: new AppStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}
