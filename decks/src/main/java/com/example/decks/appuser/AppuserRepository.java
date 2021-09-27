package com.example.decks.appuser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppuserRepository
        extends JpaRepository<Appuser, Long> {

    Optional<Appuser> findAppuserByEmail(String email);
}
