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
    private String body;
    private String definition;
    private String transcription;
    private String example;


    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL)
    private List<DeckWord> deckwords;

    public Word(){

    }
    public Word(String definition, String transcription, String example, String body) {
        this.body = body;
        this.definition = definition;
        this.transcription = transcription;
        this.example = example;

    }
    public Word(Long id, String definition, String transcription, String example, String body) {
        this.id = id;
        this.body = body;
        this.definition = definition;
        this.transcription = transcription;
        this.example = example;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
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

    public String getExample() {
        return example;
    }

    public void setExample(String example) {
        this.example = example;
    }

}
