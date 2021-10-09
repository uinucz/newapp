package com.example.decks.deck;

import com.example.decks.appuser.Appuser;
import com.example.decks.word.Word;
import com.example.decks.word.Word;
import com.example.decks.word.WordGroup;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
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
    private String name;
    @Transient
    private Boolean learnt;
    @Transient
    private Boolean showWordsToRevise;
    @Transient
    private Integer WordCount;



    @JsonManagedReference
    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL)
    private List<Word> words;

    @ManyToOne
    @JoinColumn(name="appuser_id",referencedColumnName="appuser_id")
    private Appuser appuser;

    @Override
    public String toString() {
        return "Deck{" +
                "id=" + id +
                ", learnt=" + learnt +
                ", showWordsToRevise=" + showWordsToRevise +
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
        long wordsNotLearnt = this.words.stream().filter(i -> i.getWordGroup() != WordGroup.learnt).count();
        return wordsNotLearnt == 0;
    }

    public void setLearnt(Boolean learnt) {
        this.learnt = learnt;
    }

    public List<Word> getWords() {
        return words;
    }

    public void setWords(List<Word> words) {
        this.words = words;
    }

    public Boolean getShowWordsToRevise() {
        return this.words.stream().anyMatch(Word::getStatusRepeating);
    }

    public void setShowWordsToRevise(Boolean showWordsToRevise) {
        this.showWordsToRevise = showWordsToRevise;
    }

    public Integer getWordCount() {
        return this.words.size();
    }

    public void setWordCount(Integer wordCount) {
        WordCount = wordCount;
    }


}
