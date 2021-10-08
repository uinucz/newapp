package com.example.decks.word;

import com.example.decks.appuser.Appuser;
import com.example.decks.appuser.AppuserRepository;
import com.example.decks.deck.Deck;
import com.example.decks.deck.DeckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;


import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
        toUpdate.setLast_checked(LocalDateTime.now());

        toUpdate.setWordGroup(wordGroup);

//        boolean stat;
//        if (toUpdate.getWordGroup()  == WordGroup.first & Duration.between(toUpdate.getLast_checked(),LocalDateTime.now()).toHours() > 24) stat =  true;
//        if (toUpdate.getWordGroup() == WordGroup.second && Duration.between(toUpdate.getLast_checked(),LocalDateTime.now()).toHours() > 28) stat =  true;
//        stat =  toUpdate.getWordGroup() == WordGroup.third && Duration.between(toUpdate.getLast_checked(), LocalDateTime.now()).toHours() > 196;
//        toUpdate.setStatusRepeating(stat);
//        deckRepository.findById(toUpdate.getDeck().getId()).map(deck -> {
//            List<Word> newwords = deck.getWords();
//            newwords.add(toUpdate);
//            deck.setWords(newwords);
//            deckRepository.save(deck);
//            deck.setShowWordsToRevise(deck.getWords().stream().map(Word::getStatusRepeating).count() > 0);
//            return deckRepository.save(deck);
//        }).orElseThrow(() -> new IllegalStateException("PostId  not found"));

    }
}
