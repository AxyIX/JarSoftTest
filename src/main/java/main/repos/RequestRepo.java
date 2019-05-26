package main.repos;

import main.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepo extends JpaRepository<Request, Integer> {
}
