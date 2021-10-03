package com.example.decks.deck;

import com.example.decks.appuser.Appuser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.List;

@Service
public class DeckService {

    private final DeckRepository deckRepository;

    @Autowired
    public DeckService(DeckRepository deckRepository){
        this.deckRepository = deckRepository;
    }

    public List<Deck> getDecks() {
        return deckRepository.findAll();
    }


}
