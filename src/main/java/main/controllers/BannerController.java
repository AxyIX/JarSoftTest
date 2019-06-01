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
                                               @RequestBody Map<String, String> banner) {

        String id = banner.get("id");
        String name = banner.get("name");
        String price = banner.get("price");
        String content = banner.get("content");

        if (name.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner name can't be empty!");
        }
        if (price.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner price can't be empty!");
        }
        if (content.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner content can't be empty!");
        }

        Double parsedPrice;
        try {
            parsedPrice = Double.parseDouble(price);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner price must be decimal!");
        }

        if (id == null) {
            if (bannerRepo.findByName(name) == null) {
                bannerRepo.save(new Banner(name, parsedPrice, content, categoryRepo.findById(categoryId).get()));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner with name \"" + name + "\" is already exist");
            }
        } else {
            Banner existedBanner = bannerRepo.findById(Integer.parseInt(id)).get();
            existedBanner.setName(name);
            existedBanner.setContent(content);
            existedBanner.setPrice(parsedPrice);
            existedBanner.setCategory(categoryRepo.findById(categoryId).get());
            bannerRepo.save(existedBanner);
        }
        return ResponseEntity.status(HttpStatus.OK).body("");
    }

    @DeleteMapping(path = "/banners/{bannerId}")
    public ResponseEntity<String> deleteBanner(@PathVariable(value = "bannerId") Integer bannerId) {
        bannerRepo.deleteById(bannerId);
        return ResponseEntity.status(HttpStatus.OK).body("");
    }

    @GetMapping(path = "/banners")
    public @ResponseBody
    Iterable<Banner> getAllBanners() {
        return bannerRepo.findAll();
    }
}
