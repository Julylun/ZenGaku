package com.zengaku.mvc.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


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
}
