package main.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "REQUEST")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;
    @Column(name = "ip_address", columnDefinition = "VARCHAR(255)")
    private String ipAddress;
    @Column(columnDefinition = "DATETIME")
    private Date date;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "banner_id")
    private Banner banner;

    public Request() {
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Banner getBanner() {
        return banner;
    }

    public void setBanner(Banner banner) {
        this.banner = banner;
    }

    @Override
    public String toString() {
        return "Request{" +
                "userAgent='" + userAgent + '\'' +
                ", ipAddress='" + ipAddress + '\'' +
                ", date=" + date +
                ", banner=" + banner.getName() +
                '}';
    }
}
