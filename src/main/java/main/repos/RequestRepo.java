package main.repos;

import main.models.Banner;
import main.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepo extends JpaRepository<Request, Integer> {
    Request findByUserAgentAndIpAddressAndBanner(String userAgent, String ipAddress, Banner banner);
}
