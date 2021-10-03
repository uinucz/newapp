package com.example.decks.deck;


import com.example.decks.appuser.Appuser;
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



}
