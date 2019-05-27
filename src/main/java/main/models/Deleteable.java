package main.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Deleteable {

    @JsonIgnore
    @Column(name = "deleted", columnDefinition = "boolean default false")
    private boolean deleted = false;
}
