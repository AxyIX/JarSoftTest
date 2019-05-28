package main.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/")
public class MainController {
    @RequestMapping
    public @ResponseBody
    String getRoot (){
        return "index";
    }
}
