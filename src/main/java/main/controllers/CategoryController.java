package main.controllers;

import main.models.Banner;
import main.models.Category;
import main.repos.BannerRepo;
import main.repos.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
public class CategoryController {

    @Autowired
    private BannerRepo bannerRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @PostMapping(path = "/categories")
    public ResponseEntity<String> addNewCategory (@RequestBody Map<String, String> category){

        String id = category.get("id");
        String name = category.get("name");
        String reqName = category.get("reqName");

        if (name == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Category name can't be empty!");
        }

        if (reqName == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request ID can't be empty!");
        }

        if (id != null) {
            Category existedCategory = categoryRepo.findById(Integer.parseInt(id)).get();
            existedCategory.setName(name);
            existedCategory.setReqName(reqName);
            categoryRepo.save(existedCategory);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }

        if (categoryRepo.findByName(name) != null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Category with name \"" +
                    name + "\" is already exist" );
        }

        if (categoryRepo.findByReqName(reqName) != null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Category with Request ID \"" + reqName + "\" is already exist" );
        }

        categoryRepo.save(new Category(name, reqName));
        return ResponseEntity.status(HttpStatus.OK).body("");
    }

    @DeleteMapping(path = "/categories/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable(value = "categoryId") Integer categoryId) {
        Category category = categoryRepo.findById(categoryId).get();
        List<Banner> banners = bannerRepo.findByCategory(category);
        if (banners.isEmpty()){
            categoryRepo.deleteById(categoryId);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }

        StringBuilder bannersIDs = new StringBuilder();

        bannersIDs.append(banners.get(0).getId());

        for (int i=2; i<banners.size();i++){
            bannersIDs.append(", " + banners.get(i));
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Category contains banners with IDs: " + bannersIDs + "." );
    }

    @GetMapping(path = "/categories")
    public @ResponseBody Iterable<Category>  getAllCategories(){
        return categoryRepo.findAll();
    }
}
