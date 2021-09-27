package com.example.decks.appuser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AppuserService {

    private final AppuserRepository appuserRepository;

    @Autowired
    public AppuserService(AppuserRepository appuserRepository) {
        this.appuserRepository = appuserRepository;
    }

    public List<Appuser> getAppusers(){
        return appuserRepository.findAll();
    }

    public void addNewAppuser(Appuser appuser) {
        Optional<Appuser> appuserOptional = appuserRepository
                .findAppuserByEmail(appuser.getEmail());
        if(appuserOptional.isPresent()) {
            throw new IllegalStateException("email taken");
        }
        appuserRepository.save(appuser);
    }

    public void deleteAppuser(Long appuserId){
        boolean exists = appuserRepository.existsById(appuserId);
        if(!exists){
            throw new IllegalStateException(
                    "user with id " + appuserId + " doesnt exist");
        }
        appuserRepository.deleteById(appuserId);
    }

    @Transactional
    public void updateAppuser(Long appuserId, String name, String email){
        Appuser toUpdate = appuserRepository.findById(appuserId)
                .orElseThrow(() -> new IllegalStateException("student with id " + appuserId + " doesnt exist"));

        if (name != null && name.length()>0 && !Objects.equals(toUpdate.getName(), name)){
            toUpdate.setName(name);
        }

        if (email != null && email.length()>0 && !Objects.equals(toUpdate.getEmail(), email)){
            Optional<Appuser> appuserOptional = appuserRepository
                    .findAppuserByEmail(email);
            if(appuserOptional.isPresent()) {
                throw new IllegalStateException("email taken");
            }
            toUpdate.setEmail(email);
        }
    }
}
