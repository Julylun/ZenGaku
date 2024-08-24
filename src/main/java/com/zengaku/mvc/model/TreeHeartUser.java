package com.zengaku.mvc.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.hibernate.Session;
import org.hibernate.query.Query;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Transactional
@Table(name = "treeheartuserlist")
public class TreeHeartUser {
    public TreeHeartUser(){}
    public TreeHeartUser(User user, Post post){
        this.user = user;
        this.post = post;
        time = LocalDateTime.now();
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    public static TreeHeartUser findByUUIDAndUserId(String uuid, String userId, Session session){
        Query query = session.createQuery("From TreeHeartUser as thu WHERE thu.user.id = :userId and thu.post.uuid = :uuid");
        query.setParameter("uuid",uuid);
        query.setParameter("userId",userId);
        List<TreeHeartUser> list = query.getResultList();
        return (list.isEmpty()) ? null : (session.get(TreeHeartUser.class,list.get(0).id));
    }

    public static TreeHeartUser findByUUIDAndUserId(String uuid, long userId, Session session){
        Query query = session.createQuery("From TreeHeartUser as thu WHERE thu.user.id = :userId and thu.post.uuid = :uuid");
        query.setParameter("uuid",uuid);
        query.setParameter("userId",userId);
        List<TreeHeartUser> list = query.getResultList();
        return (list.isEmpty()) ? null : (session.get(TreeHeartUser.class,list.get(0).id));
    }
}
