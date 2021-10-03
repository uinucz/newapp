import React, { useState, useRef, useEffect, useCallback } from "react";
import { Alert, Popover, OverlayTrigger, Button, Dropdown, DropdownButton } from "react-bootstrap";
import axios from 'axios'
import { nanoid } from 'nanoid'


const padding = {
    padding: 30,
}
const modifiedCursor = {
    cursor: "pointer"
}
const uuid = function b(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b) }

function identifyWords(text) {
    const words = text
        .split(/ +/)
        .map(word => {
            const cleanedWord = word
                .replace(/^["]+/, "")     // remove leading characters
                .replace(/[.,!?"]+$/, "") // remove trailing characters

            return { word: cleanedWord, original: word, uuid: uuid() }
        });

    // attach the source text to the array of words
    words.text = text;

    // return the array
    return words;
}
const loadingPopover = (
    <Popover id="popover-basic" style={{ margin: 0 }}>
        <Popover.Body>
            <span>Loading...</span>
        </Popover.Body>
    </Popover>
);

function getPopover(apiData, loadingPopover, decks, deckChoice, handleDeckChoice, addWord) {
    switch (apiData.status) {
        case "loading":
            return loadingPopover;
        case "error":
            return (
                <Popover id="popover-basic" style={{ margin: 0 }}>
                    <Popover.Body>
                        <h1>{apiData.word}</h1>
                        <h6>Couldn't find definition for {apiData.word}: {apiData.error.message}</h6>
                    </Popover.Body>
                </Popover>
            );
        case "completed":
            return (
                <Popover id="popover-basic" style={{ margin: 0 }}>
                    <Popover.Body>
                        <h1>{apiData.word}</h1>
                        <h6>{apiData.transcription}</h6>
                        <h6>{apiData.definition}</h6>
                        <h6><i>{apiData.example}</i></h6>
                    </Popover.Body>

                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10 }}>
                        <DropdownButton id="dropdown-basic-button" title={deckChoice} variant="outline-dark" >
                            {decks.map(deck =>
                                <Dropdown.Item key={nanoid()} onClick={() => handleDeckChoice(deck.name)}>{deck.name}</Dropdown.Item>
                            )}
                        </DropdownButton>
                        <Button onClick={addWord} variant={deckChoice == "колода" ? "outline-dark" : "primary"}>добавить</Button>
                    </div>

                </Popover >
            );
    }
}



export default function HomeTransformed({ handleTransform, textToHandle }) {
    const [words, _setWords] = useState(() => identifyWords(textToHandle));
    const [decks, setDecks] = useState([])
    const [deckChoice, setDeckChoice] = useState("колода")

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/v1/deck`)
            .then(response => {
                const body = response.data;
                setDecks(body);
                console.log(body)
            })
            .catch(error =>
                console.error("Failed to get definition: ", error)
            );
    }, [])

    const text = words.text;

    // mimic a setText callback that actually updates words as needed
    const setText = (newTextOrCallback) => {
        if (typeof newTextOrCallback === "function") {
            // React mutating callback mode
            _setWords((words) => {
                const newText = newTextOrCallback(words.text);
                return newText === words.text
                    ? words // unchanged
                    : identifyWords(newText); // new value
            });
        } else {
            // New value mode
            return newTextOrCallback === words.text
                ? words // unchanged
                : identifyWords(newTextOrCallback); // new value
        }
    }

    const [selectedWordObj, setSelectedWordObj] = useState(() => words.find(({ word }) => word === "luminous"));

    const [apiData, setApiData] = useState({ status: "loading" });

    useEffect(() => {
        if (!selectedWordObj) return; // do nothing.
        setApiData({ status: "loading" })
        let unsubscribed = false;
        axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWordObj.word}`)
            .then(response => {
                if (unsubscribed) return; // do nothing. out of date response

                const body = response.data;

                // unwrap relevant bits
                setApiData({
                    status: "completed",
                    word: body[0].word,
                    definition: body[0].meanings[0].definitions[0].definition,
                    transcription: body[0].phonetics[0].text,
                    example: body[0].meanings[0].definitions[0].example
                });
            })
            .catch(error => {
                if (unsubscribed) return; // do nothing. out of date response

                console.error("Failed to get definition: ", error);

                setApiData({
                    status: "error",
                    word: selectedWordObj.word,
                    error
                });
            });

        return () => unsubscribed = true;
    }, [selectedWordObj]);

    const handleDeckChoice = (x) => {
        setDeckChoice(x)
    }

    const addWord = () => {
        console.log('addword')
        if (deckChoice == "колода") return
        axios.post(`http://localhost:8080/api/v1/deck"`, {
            word: apiData.word,
            definition: apiData.definition,
            transcription: apiData.text,
            example: apiData.example
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    const selectedWordPopover = getPopover(apiData, loadingPopover, decks, deckChoice, handleDeckChoice, addWord);

    return (
        <div>
            <Alert variant="light">
                {words.map((wordObj) => {
                    const isSelectedWord = selectedWordObj && selectedWordObj.uuid === wordObj.uuid;
                    return (
                        <OverlayTrigger
                            key={wordObj.uuid}
                            rootClose={true}
                            show={isSelectedWord}
                            trigger="click"
                            placement="bottom"
                            overlay={isSelectedWord ? selectedWordPopover : loadingPopover}

                        >
                            <span onClick={() => setSelectedWordObj(wordObj)} style={modifiedCursor}> {wordObj.original}</span>
                        </OverlayTrigger>
                    )
                })}
            </Alert>
            <Button onClick={handleTransform}>назад</Button>
        </div>


    );
}
