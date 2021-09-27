import React from 'react'

export default function Popup({word, definition, transcription, example}) {
    return (
        <div>
            <h2>word</h2>
            <h4>transcription</h4>
            <h3>definition</h3>
            <h3><i>example</i></h3>
            <button>Добавить в колоду</button>
            <button>X</button>
        </div>
    )
}
