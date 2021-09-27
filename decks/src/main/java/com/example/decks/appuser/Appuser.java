package com.example.decks.appuser;

import com.example.decks.deck.Deck;
import com.example.decks.text.Text;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
//comment
@Entity
@Table

public class Appuser {
    @Id
    @SequenceGenerator(
            name = "appuser_sequence",
            sequenceName = "appuser_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "appuser_sequence"
    )
    private Long id;
    private String name;
    @Transient
    private Integer age;
    private LocalDate dob;
    private String email;

    @OneToMany(mappedBy = "appuser", cascade = CascadeType.ALL)
    private List<Deck> decks;

    @OneToMany(mappedBy = "appuser", cascade = CascadeType.ALL)
    private List<Text> texts;

    public Appuser(){

    }

    public Appuser(Long id, String name, LocalDate dob, String email) {
        this.id = id;
        this.name = name;

        this.dob = dob;
        this.email = email;
    }

    public Appuser(String name, LocalDate dob, String email) {
        this.name = name;

        this.dob = dob;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return Period.between(this.dob,LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "appUser{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", dob=" + dob +
                ", email='" + email + '\'' +
                '}';
    }


}
