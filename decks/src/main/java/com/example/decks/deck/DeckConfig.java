package com.example.decks.deck;

import com.example.decks.appuser.Appuser;
import com.example.decks.appuser.AppuserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class DeckConfig {

    @Bean
    CommandLineRunner commandLineRunnerDeck(
            DeckRepository deckRepository){
        return args -> {
            Deck seconddeck = new Deck(
                    "chadDeck"
            );
            Deck firstdeck = new Deck(
                    "firstdeck"
            );

            deckRepository.saveAll(List.of(firstdeck,seconddeck));
        };
    }
}