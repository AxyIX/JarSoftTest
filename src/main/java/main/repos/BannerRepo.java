package main.repos;

import main.models.Banner;
import main.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface BannerRepo extends JpaRepository<Banner, Integer> {
    Banner findByName(String name);
    Set<Banner> findByCategoryOrderByPriceDesc(Category category);
}
