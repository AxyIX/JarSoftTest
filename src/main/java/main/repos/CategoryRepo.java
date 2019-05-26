package main.repos;

import main.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
    Category findByName(String name);
    Category findByReqName(String reqName);
}
