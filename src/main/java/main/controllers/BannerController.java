package main.controllers;

import main.models.Banner;
import main.repos.BannerRepo;
import main.repos.CategoryRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    @PostMapping(path = "categories/{categoryId}/banners")
    public ResponseEntity<String> addNewBanner(@PathVariable(value = "categoryId") String categoryId,
                                               @RequestBody Map<String, String> banner) {

        if(categoryId.isEmpty() || categoryId.equals("undefined") || categoryId.equals("null")){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Categories is empty. Add some category at first!");
        }

        Integer intCategoryId = Integer.parseInt(categoryId);

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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner price must be decimal point separated!");
        }

        if (id != null) {
            Banner existedBanner = bannerRepo.findById(Integer.parseInt(id)).get();
            existedBanner.setName(name);
            existedBanner.setContent(content);
            existedBanner.setPrice(parsedPrice);
            existedBanner.setCategory(categoryRepo.findById(intCategoryId).get());
            bannerRepo.save(existedBanner);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }

        if (bannerRepo.findByName(name) != null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Banner with name \"" + name + "\" is already exist");
        }

        Integer newId = bannerRepo.save(new Banner(name, parsedPrice, content, categoryRepo.findById(intCategoryId).get())).getId();
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
