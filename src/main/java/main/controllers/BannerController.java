package main.controllers;

import main.models.Banner;
import main.repos.BannerRepo;
import main.repos.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class BannerController {
    @Autowired
    private BannerRepo bannerRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @GetMapping(path = "/banners/add")
    public ResponseEntity<String> addNewBanner(@RequestParam String name, @RequestParam Double price, @RequestParam String content, @RequestParam String category){
        if (bannerRepo.findByName(name) == null){
            Banner banner = new Banner();
            banner.setName(name);
            banner.setPrice(price);
            banner.setContent(content);
            banner.setCategory(categoryRepo.findByName(category));
            bannerRepo.save(banner);
            return ResponseEntity.status(HttpStatus.OK).body("");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner with name \"" + name + "\" is already exist");
        }
    }

    @GetMapping(path = "/banners/all")
    public @ResponseBody Iterable<Banner> getAllBanners(){
        return bannerRepo.findAll();
    }

    @RequestMapping(path = "/banners")
    public String getIndex(Map<String, Object> model) {
        return "forward:index.html";
    }
}
