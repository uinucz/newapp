package com.example.decks.deck;

import com.example.decks.appuser.Appuser;
import com.example.decks.deckword.DeckWord;
import com.example.decks.word.Word;

import javax.persistence.*;
import java.awt.print.Book;
import java.util.List;

@Entity
@Table(name = "deck")

public class Deck {
    @Id
    @SequenceGenerator(
            name = "deck_sequence",
            sequenceName = "deck_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "deck_sequence"
    )
    @Column(name = "deck_id")
    private Long id;
    @Transient
    private Boolean learnt;
    private String name;


    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL)
    private List<DeckWord> deckwords;

    @ManyToOne
    @JoinColumn(name="appuser_id",referencedColumnName="appuser_id")
    private Appuser appuser;

    @Override
    public String toString() {
        return "Deck{" +
                "id=" + id +
                ", learnt=" + learnt +
                '}';
    }

    public Deck() {}

    public Deck(String name) {
        this.name = name;
    }
    public Deck(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getLearnt() {
        long wordsToShow = this.deckwords.stream().map(i -> i.getShow() == true).count();
        if(wordsToShow > 0) return true;
        return false;
    }

    public void setLearnt(Boolean learnt) {
        this.learnt = learnt;
    }


}
