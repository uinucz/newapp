package com.example.decks.word;

import com.example.decks.appuser.Appuser;
import com.example.decks.appuser.AppuserRepository;
import com.example.decks.deck.Deck;
import com.example.decks.deck.DeckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WordService {

    private final WordRepository wordRepository;
    private final DeckRepository deckRepository;


    @Autowired
    public WordService(WordRepository wordRepository, DeckRepository deckRepository) {
        this.wordRepository = wordRepository;
        this.deckRepository = deckRepository;
    }

    public List<Word> getWords(){
        return wordRepository.findAll();
    }

    public void addNewWord(Word word, Long DeckID) {
        deckRepository.findById(DeckID).map(deck -> {
            word.setDeck(deck);
            return wordRepository.save(word);
        }).orElseThrow(() -> new IllegalStateException("PostId " + DeckID + " not found"));
    }

    @Transactional
    public void editWordGroup(Long wordID, WordGroup wordGroup) {
        Word toUpdate = wordRepository.findById(wordID)
                .orElseThrow(() -> new IllegalStateException("word with id " + wordID + " doesnt exist"));
        if (toUpdate.getWordGroup() != WordGroup.newUnseen) {
            toUpdate.setLast_checked(LocalDate.now());
        }
        toUpdate.setWordGroup(wordGroup);

    }
}
