package main.controllers;

import main.models.Banner;
import main.models.Category;
import main.models.Request;
import main.repos.BannerRepo;
import main.repos.CategoryRepo;
import main.repos.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Set;

@Controller
@RequestMapping(path = "/bid")
public class RandomBannerController {

    @Autowired
    private RequestRepo requestRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private BannerRepo bannerRepo;

    @GetMapping
    public ResponseEntity<String> getBanner(@RequestParam String category, HttpServletRequest request){

        String userAgent = request.getHeader("User-Agent");
        String ipAddress = request.getRemoteAddr();

        Set<Banner> banners;

        Category responseCategory = categoryRepo.findByReqName(category);
        if (responseCategory != null){
            banners = bannerRepo.findByCategoryOrderByPriceDesc(responseCategory);

            for (Banner banner : banners){
                Request lastRequest = requestRepo.findByUserAgentAndIpAddressAndBanner(userAgent, ipAddress, banner);
                if (lastRequest == null){
                    Request newRequest = new Request();
                    newRequest.setIpAddress(ipAddress);
                    newRequest.setUserAgent(userAgent);
                    newRequest.setDate(new Date());
                    newRequest.setBanner(banner);
                    requestRepo.save(newRequest);
                    return ResponseEntity.status(HttpStatus.OK).body(banner.getContent());
                }
            }
        }

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }
}
