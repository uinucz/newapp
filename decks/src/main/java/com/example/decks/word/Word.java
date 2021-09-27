package com.example.decks.word;

import com.example.decks.deck.Deck;
import com.example.decks.deckword.DeckWord;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "word")

public class Word {
    @Id
    @SequenceGenerator(
            name = "word_sequence",
            sequenceName = "word_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "word_sequence"
    )
    @Column(name = "word_id")
    private Long id;
    private String definition;
    private String transcription;


    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL)
    private List<DeckWord> deckwords;

    public Word(){

    }
    public Word(Long id, String definition, String transcription) {
        this.id = id;
        this.definition = definition;
        this.transcription = transcription;


    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public String getTranscription() {
        return transcription;
    }

    public void setTranscription(String transcription) {
        this.transcription = transcription;
    }


}
