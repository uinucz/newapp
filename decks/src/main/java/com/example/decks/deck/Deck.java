package com.example.decks.deck;

import com.example.decks.appuser.Appuser;
import com.example.decks.word.Word;

import javax.persistence.*;
import java.awt.print.Book;
import java.util.List;
//3rd comment
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
    private Long id;
    private Boolean learnt;

    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL)
    private List<Word> words;

    @ManyToOne
    @JoinColumn(name="appuser_id")
    private Appuser appuser;

    @Override
    public String toString() {
        return "Deck{" +
                "id=" + id +
                ", learnt=" + learnt +
                '}';
    }

    public Deck() {}

    public Deck(Boolean learnt) {
        this.learnt = learnt;
    }

    public Deck(Long id, Boolean learnt) {
        this.id = id;
        this.learnt = learnt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getLearnt() {
        return learnt;
    }

    public void setLearnt(Boolean learnt) {
        this.learnt = learnt;
    }


}
