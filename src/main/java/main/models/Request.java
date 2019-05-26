package main.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "REQUEST")
public class Request extends Deleteable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_agent")
    private String userAgent;
    @Column(name = "ip_address")
    private String ipAddress;
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY)
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
}
