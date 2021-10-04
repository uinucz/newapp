package com.example.decks.word;

import com.example.decks.appuser.Appuser;
import com.example.decks.word.Word;
import com.example.decks.word.WordRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class WordConfig {

//    @Bean
//    CommandLineRunner commandLineRunnerWord(
//            WordRepository wordRepository){
//        return args -> {
//            Word firstWord = new Word(
//
//                    "greeting",
//                    "hello",
//                    "hello world",
//                    "hello"
//
//                );
//            Word secondWord = new Word(
//
//                    "animal",
//                    "dog",
//                    "dog and cat",
//                    "dog"
//
//            );
//            Word thirdWord = new Word(
//
//                    "fruit",
//                    "apple",
//                    "green apple",
//                    "apple"
//
//            );
//
//            wordRepository.saveAll(List.of(firstWord, secondWord, thirdWord));
//        };
//    }
}