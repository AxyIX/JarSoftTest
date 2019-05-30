package main.controllers;

import main.models.Banner;
import main.repos.BannerRepo;
import main.repos.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class BannerController {
    @Autowired
    private BannerRepo bannerRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @PostMapping(path = "category/{categoryId}/banners")
    public ResponseEntity<String> addNewBanner(@PathVariable(value = "categoryId") Integer categoryId,
                                               @RequestBody Map<String, Object> banner){

        if (banner.get("name").toString().isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner name can't be empty!");
        }
        if (banner.get("price").toString().isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner price can't be empty!");
        }
        if (banner.get("content").toString().isEmpty() ){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner content can't be empty!");
        }

        Double parsedPrice;
        try {
            parsedPrice = Double.parseDouble(banner.get("price").toString());
        } catch (NumberFormatException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner price must be decimal!");
        }

        if (bannerRepo.findByName(banner.get("name").toString()) == null){
            bannerRepo.save(new Banner((String) banner.get("name"), parsedPrice, banner.get("content").toString(), categoryRepo.findById(categoryId).get()));
            return ResponseEntity.status(HttpStatus.OK).body("");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner with name \"" + banner.get("name") + "\" is already exist");
        }
    }

    @GetMapping(path = "/banners")
    public @ResponseBody Iterable<Banner> getAllBanners(){
        return bannerRepo.findAll();
    }
}
