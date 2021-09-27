package com.example.decks.text;

import com.example.decks.appuser.Appuser;

import javax.persistence.*;

@Entity
@Table


public class Text {
    @Id
    @SequenceGenerator(
            name = "text_sequence",
            sequenceName = "text_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "text_sequence"
    )
    private Long id;
    private String body;

    @ManyToOne
    @JoinColumn(name="appuser_id")
    private Appuser appuser;

    public Text(){}

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


    public Text(Long id, String body) {
        this.id = id;
        this.body = body;
    }

}
