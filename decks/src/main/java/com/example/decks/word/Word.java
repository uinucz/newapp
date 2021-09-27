package com.example.decks.word;

import com.example.decks.deck.Deck;

import javax.persistence.*;
import java.util.Date;

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
    private Long id;
    private String definition;
    private String transcription;
    private Boolean learnt;
    private Date last_checked;
    private Integer times_checked;

    @ManyToOne
    @JoinColumn(name="deck_id")
    private Deck deck;

    public Word(){

    }
    public Word(Long id, String definition, String transcription, Boolean learnt, Date last_checked, Integer times_checked) {
        this.id = id;
        this.definition = definition;
        this.transcription = transcription;
        this.learnt = learnt;
        this.last_checked = last_checked;
        this.times_checked = times_checked;

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

    public Boolean getLearnt() {
        return learnt;
    }

    public void setLearnt(Boolean learnt) {
        this.learnt = learnt;
    }

    public Date getLast_checked() {
        return last_checked;
    }

    public void setLast_checked(Date last_checked) {
        this.last_checked = last_checked;
    }

    public Integer getTimes_checked() {
        return times_checked;
    }

    public void setTimes_checked(Integer times_checked) {
        this.times_checked = times_checked;
    }

}
