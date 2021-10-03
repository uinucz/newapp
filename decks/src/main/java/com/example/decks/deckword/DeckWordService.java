package com.example.decks.deckword;

import com.example.decks.deck.DeckRepository;
import com.example.decks.deck.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeckWordService {

    private final DeckWordRepository deckWordRepository;

    @Autowired
    public DeckWordService(DeckWordRepository deckWordRepository){
        this.deckWordRepository = deckWordRepository;
    }
}
