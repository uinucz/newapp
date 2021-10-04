package com.example.decks.word;


 import com.example.decks.appuser.Appuser;
 import com.example.decks.word.WordService;
import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.web.bind.annotation.*;

 import java.util.List;

@RestController
@RequestMapping(path="api/v1/word")
public class WordController {

    private final WordService wordService;

    @Autowired
    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping
    public List<Word> getWords(){
        return wordService.getWords();
    }

    @PostMapping("{deckID}")
    public void addNewWord(@RequestBody Word word,@PathVariable (value = "deckID") Long deckID){
        wordService.addNewWord(word, deckID);
    }

    @PutMapping("{wordID}/{wordGroup}")
    public void editWordGroup(@PathVariable("wordID") Long wordID,
                              @PathVariable("wordGroup") WordGroup wordGroup) {

        wordService.editWordGroup(wordID, wordGroup);
    }

}
