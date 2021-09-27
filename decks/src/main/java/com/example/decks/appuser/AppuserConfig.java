package com.example.decks.appuser;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.example.decks.appuser.AppuserRepository;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class AppuserConfig {

    @Bean
    CommandLineRunner commandLineRunner(
            AppuserRepository appuserRepository){
        return args -> {
            Appuser John = new Appuser(

                    "John",
                    LocalDate.of(2000,1,1),
                    "johnny@gmail.com"
            );
            Appuser Jack = new Appuser(

                    "Jack",
                    LocalDate.of(2004,1,1),
                    "jack@gmail.com"
            );

            appuserRepository.saveAll(List.of(John, Jack));
        };
    }
}
