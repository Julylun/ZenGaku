package com.zengaku.mvc.model;

import com.zengaku.mvc.controller.HibernateUtils;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Session;

import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "friendship")
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "from_userid")
    private User fromUser;
    @ManyToOne
    @JoinColumn(name = "to_userid")
    private User toUser;
    @Column(name = "status", nullable = false)
    private String status;
public Friendship(){

}
    public Friendship(User fromUser, User toUser, Status.FriendshipStatus status) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.status = status.toString();
    }

    public static boolean isFriend(User user_1, User user_2) {
       return isFriend(user_1, user_2, HibernateUtils.getSessionFactory().openSession());
    }
    public static boolean isFriend(User user_1, User user_2, Session session) {
        List<Friendship> friendshipList = session.createQuery("From Friendship WHERE (fromUser = :user_1 and toUser = :user_2) OR (fromUser = :user_2 and toUser = :user_1)")
                .setParameter("user_1",user_1)
                .setParameter("user_2",user_2)
                .getResultList();
        return (friendshipList != null && friendshipList.get(0).status.equals(Status.FriendshipStatus.Friend)) ? true : false;
    }

    public static boolean isBestie(User user_1, User user_2) {
        return isBestie(user_1, user_2, HibernateUtils.getSessionFactory().openSession());
    }
    public static boolean isBestie(User user_1, User user_2, Session session) {
        List<Friendship> friendshipList = session.createQuery("From Friendship WHERE (fromUser = :user_1 and toUser = :user_2) OR (fromUser = :user_2 and toUser = :user_1)")
                .setParameter("user_1",user_1)
                .setParameter("user_2",user_2)
                .getResultList();
        return (friendshipList != null && friendshipList.get(0).status.equals(Status.FriendshipStatus.Bestie)) ? true : false;
    }

    public static String getStatusFromCouple(User user_1, User user_2, Session session) {
        List<Friendship> friendshipList = session.createQuery("From Friendship WHERE (fromUser = :user_1 and toUser = :user_2) OR (fromUser = :user_2 and toUser = :user_1)")
                .setParameter("user_1",user_1)
                .setParameter("user_2",user_2)
                .getResultList();
        for(Friendship friendship: friendshipList) {
            System.out.println("Fensip -> " + friendship.id + " - " + friendship.getStatus());
        }

        Friendship friendship = friendshipList.get(0);
        if(friendship == null) return null;

        if(friendship.status.equals(Status.FriendshipStatus.PendingFriend.toString()) &&
           friendship.getFromUser().equals(user_2)
        ) return Status.FriendshipStatus.Responding.toString();


        return friendship.status;
    }

    public static Friendship getFriendShipByCouple(User user_1, User user_2, Session session) {
        List<Friendship> friendshipList = session.createQuery("From Friendship WHERE (fromUser = :user_1 and toUser = :user_2) OR (fromUser = :user_2 and toUser = :user_1)")
                .setParameter("user_1",user_1)
                .setParameter("user_2",user_2)
                .getResultList();
        return (friendshipList.isEmpty()) ? null : friendshipList.get(0);
    }

}
