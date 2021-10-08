package com.example.decks.deck;


import com.example.decks.appuser.Appuser;
import com.example.decks.word.Word;
import com.example.decks.word.WordGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/deck")
public class DeckController {

    private final DeckService deckService;

    @Autowired
    public DeckController(DeckService deckService){
        this.deckService = deckService;
    }

    @GetMapping
    public List<Deck> getDecks() {return deckService.getDecks();}


    @PostMapping("{name}")
    public void postDeck(@PathVariable("name") String deckName) {
        deckService.addNewDeck(deckName);
    }



}
