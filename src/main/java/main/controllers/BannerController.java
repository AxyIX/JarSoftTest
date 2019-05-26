package main.controllers;

import main.models.Category;
import main.repos.BannerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/banner")
public class BannerController {
    @Autowired
    private BannerRepo bannerRepo;

    @GetMapping(path = "/add")
    public @ResponseBody String addNewBanner(@RequestParam String name, @RequestParam Double price, @RequestParam String content, @RequestParam Category category){
        return "haha";
    }

}
