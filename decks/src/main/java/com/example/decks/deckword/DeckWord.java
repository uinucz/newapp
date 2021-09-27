package com.example.decks.deckword;

import com.example.decks.deck.Deck;
import com.example.decks.word.Word;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.Period;
import java.util.Date;
import java.util.List;
import java.util.Objects;
enum WordGroup{
    first,
    second,
    third
}

@Embeddable
class DeckWordKey implements Serializable {

    @Column(name = "deck_id")
    Long deckId;

    @Column(name = "word_id")
    Long wordId;

    public DeckWordKey (){}
    public DeckWordKey(Long deckId, Long wordId) {
        this.deckId = deckId;
        this.wordId = wordId;
    }

    public Long getDeckId() {
        return deckId;
    }

    public void setDeckId(Long deckId) {
        this.deckId = deckId;
    }

    public Long getWordId() {
        return wordId;
    }

    public void setWordId(Long wordId) {
        this.wordId = wordId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DeckWordKey that = (DeckWordKey) o;
        return Objects.equals(deckId, that.deckId) &&
                Objects.equals(wordId, that.wordId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(deckId, wordId);
    }
    // standard constructors, getters, and setters
    // hashcode and equals implementation
}


@Entity
@Table
public class DeckWord {
    @EmbeddedId
    DeckWordKey id;

    @ManyToOne
    @MapsId("deckId")
    @JoinColumn(name = "deck_id",referencedColumnName="deck_id")
    Deck deck;

    @ManyToOne
    @MapsId("word_id")
    @JoinColumn(name = "word_id",referencedColumnName="word_id")
    Word word;

    private Boolean learnt;
    private LocalDate last_checked;
    private WordGroup wordGroup;
    @Transient
    private Boolean show;


    public DeckWordKey getId() {
        return id;
    }

    public void setId(DeckWordKey id) {
        this.id = id;
    }

    public Deck getDeck() {
        return deck;
    }

    public void setDeck(Deck deck) {
        this.deck = deck;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }

    public Boolean getLearnt() {
        return learnt;
    }

    public void setLearnt(Boolean learnt) {
        this.learnt = learnt;
    }

    public LocalDate getLast_checked() {
        return last_checked;
    }

    public void setLast_checked(LocalDate last_checked) {
        this.last_checked = last_checked;
    }

    public WordGroup getWordGroup() {
        return wordGroup;
    }

    public void setWordGroup(WordGroup wordGroup) {
        this.wordGroup = wordGroup;
    }

    public Boolean getShow() {
//        if (learnt) return false;
//        else if (this.group == Group.first &&
//                Period.between(this.last_checked,LocalDate.now()).getDays() > 1) return true;
//        else if (this.group == Group.second &&
//                Period.between(this.last_checked,LocalDate.now()).getDays() > 2) return true;
//        else if (this.group == Group.third &&
//                Period.between(this.last_checked,LocalDate.now()).getDays() > 7) return true;
        return false;
    }

    public void setShow(Boolean show) {
        this.show = show;
    }

    public DeckWord(){}

    public DeckWord(Deck deck, Word word, Boolean learnt, LocalDate last_checked, WordGroup wordGroup) {
        this.deck = deck;
        this.word = word;
        this.learnt = learnt;
        this.last_checked = last_checked;
        this.wordGroup = wordGroup;
    }

    public DeckWord(DeckWordKey id, Deck deck, Word word, Boolean learnt, LocalDate last_checked, WordGroup wordGroup) {
        this.id = id;
        this.deck = deck;
        this.word = word;
        this.learnt = learnt;
        this.last_checked = last_checked;
        this.wordGroup = wordGroup;
    }
}
