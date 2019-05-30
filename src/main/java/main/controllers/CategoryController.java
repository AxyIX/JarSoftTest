package main.controllers;

import main.models.Category;
import main.repos.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class CategoryController {

    @Autowired
    private CategoryRepo categoryRepo;

    @PostMapping(path = "/categories")
    public ResponseEntity<String> addNewCategory (@RequestBody Category category){
        if(categoryRepo.findByName(category.getName()) == null){
            if (categoryRepo.findByReqName(category.getReqName()) == null){
                categoryRepo.save(category);
                return ResponseEntity.status(HttpStatus.OK).body("");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Category with Request ID \"" + category.getReqName() + "\" is already exist" );
            }
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Category with name \"" + category.getName() + "\" is already exist" );
        }
    }

    @GetMapping(path = "/categories")
    public @ResponseBody Iterable<Category>  getAllCategories(){
        return categoryRepo.findAll();
    }
}
