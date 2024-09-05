package com.zengaku.mvc.model;

import com.zengaku.mvc.controller.HibernateUtils;
import jakarta.ejb.Local;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.Session;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "RefreshToken")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "refreshToken", nullable = false)
    private String refreshToken;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @Column(name = "expiryTime", nullable = false)
    private LocalDateTime expiryTime;

    public static final long EXPIRED_TIME = 1728000000L *4; //ms ~ 20 day
    public RefreshToken(){
        expiryTime = LocalDateTime.now().plusDays(20);
    }
    public RefreshToken(User user, String jwtToken){
        this();
        this.user = user;
        this.refreshToken = jwtToken;
    }

    public boolean isExpired(){
        return LocalDateTime.now().isAfter(expiryTime);
    }
    public static boolean isExpired(User user){
        return isExpried(user.getId());
    }

    public static boolean isExpried(long userId){
        Session session = HibernateUtils.getSessionFactory().openSession();

        Query query = session.createQuery("From RefreshToken r WHERE r.user.id = :id");
        query.setParameter("id",userId);
        List<RefreshToken> refreshTokens = query.getResultList();
        if(refreshTokens.size() == 0) return true;
        if(refreshTokens.get(0).isExpired()){
            session.remove(refreshTokens.get(0));
            session.close();
            return true;
        }
        return false;
    }
    public static String getRefreshTokenByUser(User user){
        Session session = HibernateUtils.getSessionFactory().openSession();

        Query query = session.createQuery("From RefreshToken r WHERE r.user.id = :id");
        query.setParameter("id",user.getId());
        List<RefreshToken> refreshTokens = query.getResultList();
        if(refreshTokens.size() == 0) return null;
        return refreshTokens.get(0).getRefreshToken();
    }

}
