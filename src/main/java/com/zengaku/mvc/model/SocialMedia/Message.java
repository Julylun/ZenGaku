package com.zengaku.mvc.model.SocialMedia;

import com.zengaku.mvc.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "message", schema = "zengaku_db")
public class Message {
    public Message(){};
    public Message(User fromUser, User toUser, String bodyText) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.bodyText = bodyText;
        this.seen = false;
        this.sendTime = LocalDateTime.now();
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fromUserId")
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "toUserId")
    private User toUser;

    @Lob
    @Column(name = "bodyText")
    private String bodyText;

    @Column(name = "seen")
    private Boolean seen;

    @Column(name = "sendTime")
    private LocalDateTime sendTime;

}