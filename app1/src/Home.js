import React, { useState } from "react";
import HomeInput from './HomeInput'
import HomeTransformed from "./HomeTransformed";

export default function Home() {
    const [text, setText] = useState("Once in his room, he resumed his writing. The days and nights came and went, and he sat at his table and wrote on. He went nowhere, save to the pawnbroker, took no exercise, and ate methodically when he was hungry and had something to cook, and just as methodically went without when he had nothing to cook. Composed as the story was, in advance, chapter by chapter, he nevertheless saw and developed an opening that increased the power of it, though it necessitated twenty thousand additional words. It was not that there was any vital need that the thing should be well done, but that his artistic canons compelled him to do it well. He worked on in the daze, strangely detached from the world around him, feeling like a familiar ghost among these literary trappings of his former life. He remembered that some one had said that a ghost was the spirit of a man who was dead and who did not have sense enough to know it; and he paused for the moment to wonder if he were really dead and unaware of it.")
    const [transformed, setTransformed] = useState(false)

    const handleTransform = (e) => {
        e.preventDefault()
        setTransformed(transformed => !transformed)
    }

    const handleChange = (event) => {
        setText(event.target.value)
    }

    if (transformed) {
        return <HomeInput text={text} handleChange={handleChange} handleTransform={handleTransform} />
    }
    return <HomeTransformed textToHandle={text} handleTransform={handleTransform} />
}

