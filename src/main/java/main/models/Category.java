package main.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "CATEGORY")
@SQLDelete(sql = "update category SET deleted = true WHERE id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "deleted=false")
public class Category extends Deleteable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "VARCHAR(255)", nullable = false)
    private String name;
    @Column(name = "req_name", columnDefinition = "VARCHAR(255)", nullable = false)
    private String reqName;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private Set<Banner> banners;


    public Category() {
    }

    public Category(String name, String reqName) {
        this.name = name;
        this.reqName = reqName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReqName() {
        return reqName;
    }

    public void setReqName(String reqName) {
        this.reqName = reqName;
    }

    public Set<Banner> getBanners() {
        return banners;
    }

    public void setBanners(Set<Banner> banners) {
        this.banners = banners;
    }

    @Override
    public String toString() {
        return "Category{" +
                "name='" + name + '\'' +
                ", reqName='" + reqName + '\'' +
                '}';
    }
}
