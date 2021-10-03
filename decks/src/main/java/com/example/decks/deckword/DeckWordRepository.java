package com.example.decks.deckword;

import com.example.decks.deckword.DeckWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DeckWordRepository extends JpaRepository<DeckWord, DeckWordKey> {

}