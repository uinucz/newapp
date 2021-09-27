import React from 'react'

export default function Card({word, definition, transcription, example}) {
    return (
        <div>
            <h1>word</h1>
            <h4>transcription</h4>
            <h3>definition</h3>
            <h3><i>example</i></h3>
            <button>Запомнил</button>
            <button>Повторить</button>
        </div>
    )
}
