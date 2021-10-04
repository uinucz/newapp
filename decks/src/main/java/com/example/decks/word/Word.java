package com.example.decks.word;

import com.example.decks.appuser.Appuser;
import com.example.decks.deck.Deck;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;
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
    private LocalDate last_checked;
    @Enumerated(EnumType.STRING)
    private WordGroup wordGroup = WordGroup.newUnseen;
    @Transient
    private Boolean statusLearning = false;
    @Transient
    private Boolean statusRepeating = false;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="deck_id",referencedColumnName="deck_id")
    private Deck deck;


    public Word(){

    }

    public Word(String body, String definition, String transcription, String example, LocalDate last_checked, WordGroup wordGroup, Boolean statusLearning, Boolean statusRepeating) {
        this.body = body;
        this.definition = definition;
        this.transcription = transcription;
        this.example = example;
        this.last_checked = last_checked;
        this.wordGroup = wordGroup;
        this.statusLearning = statusLearning;
        this.statusRepeating = statusRepeating;
    }

    public Word(String body, Deck deck, String definition, String transcription, String example, LocalDate last_checked, WordGroup wordGroup, Boolean statusLearning, Boolean statusRepeating) {
        this.body = body;
        this.definition = definition;
        this.transcription = transcription;
        this.example = example;
        this.last_checked = last_checked;
        this.wordGroup = wordGroup;
        this.statusLearning = statusLearning;
        this.statusRepeating = statusRepeating;
        this.deck = deck;
    }

    public Word(String body, String definition, String transcription, String example, WordGroup wordGroup, Boolean statusLearning, Boolean statusRepeating) {
        this.body = body;
        this.definition = definition;
        this.transcription = transcription;
        this.example = example;
        this.wordGroup = wordGroup;
        this.statusLearning = statusLearning;
        this.statusRepeating = statusRepeating;
    }

    public Word(String definition, String transcription, String example, String body) {
        this.body = body;
        this.definition = definition;
        this.transcription = transcription;
        this.example = example;

    }

    public Deck getDeck() {
        return deck;
    }

    public void setDeck(Deck deck) {
        this.deck = deck;
    }

    public Boolean getStatusLearning() {
        return this.wordGroup == WordGroup.newLearning;
    }
    public void setStatusLearning(Boolean statusLearning) {
        this.statusLearning = statusLearning;
    }

    public Boolean getStatusRepeating() {
        if (this.wordGroup == WordGroup.first && Period.between(this.last_checked,LocalDate.now()).getDays() > 1) return true;
        if (this.wordGroup == WordGroup.second && Period.between(this.last_checked,LocalDate.now()).getDays() > 2) return true;
        return this.wordGroup == WordGroup.third && Period.between(this.last_checked, LocalDate.now()).getDays() > 7;
    }
    public void setStatusRepeating(Boolean statusRepeating) {
        this.statusRepeating = statusRepeating;
    }

    public WordGroup getWordGroup(){
        return wordGroup;
    }
    public void setWordGroup(WordGroup wordGroup){
        this.wordGroup = wordGroup;
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

    public LocalDate getLast_checked() {
        return last_checked;
    }

    public void setLast_checked(LocalDate last_checked) {
        this.last_checked = last_checked;
    }

}
