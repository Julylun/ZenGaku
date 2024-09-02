package com.zengaku.mvc.model;

import com.zengaku.mvc.controller.HibernateUtils;
import jakarta.ejb.Local;
import jakarta.persistence.*;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.apache.commons.codec.binary.Base64;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "AuthToken")
public class AuthToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "accessToken", nullable = false)
    private String accessToken;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @Column(name = "expiryTime", nullable = false)
    private LocalDateTime expiryTime;
    public static final long EXPIRED_TIME = 3600000; //ms ~ 1 hour

    public AuthToken(){
        expiryTime = LocalDateTime.now().plusHours(1);
    }

    public AuthToken(User user, String accessToken){
        this();
        this.user = user;
        this.accessToken = accessToken;
    }

    public boolean isExpired(){
        return LocalDateTime.now().isAfter(expiryTime);
    }
    public static long getUserIdByAccessToken(String accessToken){
        String splitToken = accessToken.split("\\.")[1];
        Base64 base64 = new Base64();
        String body = new String(base64.decode(splitToken.getBytes(StandardCharsets.UTF_8)));
        JSONObject readJson = new JSONObject(body);
        Long userId = Long.valueOf(readJson.getInt("sub"));
        return userId;
    }

    public static User getUserByAccessToken(String accessToken){
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        Query query = databaseSession.createQuery("From User where id = :id");
        query.setParameter("id",getUserIdByAccessToken(accessToken));
        List<User> users = query.list();
        if(users.size() != 0){
            return users.get(0);
        }
        return null;
    }

    public static boolean isExpired(String accessToken){
        Long userId = getUserIdByAccessToken(accessToken);

        Session session = HibernateUtils.getSessionFactory().openSession();
        Query query = session.createQuery("From AuthToken AS auth WHERE auth.user.id = :id ");
        query.setParameter("id", userId);
        List<AuthToken> authTokenList = query.list();

        for(AuthToken authToken : authTokenList){
            if(authToken.getAccessToken().equals(accessToken) && !authToken.isExpired()){
                return true;
            }
        }
        return false;
    }
}
