package main.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class MainController {
    @RequestMapping(path = "/")
    public String getRoot (Map<String, Object> model){
        return "forward:index.html";
    }
}
