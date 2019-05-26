package main.models;

import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "BANNER")
@Where(clause = "deleted=false")
public class Banner extends Deleteable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private double price;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "banner")
    private List<Request> requests;

    public Banner(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Request> getRequests() {
        return requests;
    }

    public void setRequests(List<Request> requests) {
        this.requests = requests;
    }
}
