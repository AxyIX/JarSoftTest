package main.repos;

import main.models.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepo extends JpaRepository<Banner, Integer> {
    Banner findByName(String name);
}
