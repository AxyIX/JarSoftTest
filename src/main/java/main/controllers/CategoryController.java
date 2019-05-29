package main.controllers;

import main.models.Category;
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
public class CategoryController {

    @Autowired
    private CategoryRepo categoryRepo;

    @GetMapping(path = "/categories/add")
    public ResponseEntity<String> addNewCategory (@RequestParam String name, @RequestParam String reqName){
        if(categoryRepo.findByName(name) == null){
            if (categoryRepo.findByReqName(reqName) == null){
                Category category = new Category();
                category.setName(name);
                category.setReqName(reqName);
                categoryRepo.save(category);
                return ResponseEntity.status(HttpStatus.OK).body("");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Category with Request ID \"" + reqName + "\" is already exist" );
            }
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Category with name \"" + name + "\" is already exist" );
        }
    }

    @GetMapping(path = "/categories/all")
    public @ResponseBody Iterable<Category>  getAllCategories(){
        return categoryRepo.findAll();
    }

    @RequestMapping(path = "/categories")
    public String getIndex(Map<String, Object> model) {
        return "forward:index.html";
    }
}
