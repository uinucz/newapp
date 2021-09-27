package com.example.decks.appuser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/appuser")

public class AppuserController {

    private final AppuserService appuserService;

    @Autowired
    public AppuserController(AppuserService appuserService) {
        this.appuserService = appuserService;
    }

    @GetMapping
    public List<Appuser> getAppusers(){
        return appuserService.getAppusers();
    }

    @PostMapping
    public void registerNewAppuser(@RequestBody Appuser appuser){
        appuserService.addNewAppuser(appuser);
    }

    @DeleteMapping(path = "{appuserId}")
    public void deleteAppuser(@PathVariable("appuserId") Long appuserId){
        appuserService.deleteAppuser(appuserId);
    }

    @PutMapping(path = "{appuserId}")
    public void updateAppuser(
            @PathVariable("appuserId") Long appuserId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email){
        appuserService.updateAppuser(appuserId, name, email);
    }
}
