package com.zengaku.mvc.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "passwordresettoken")
public class PasswordResetToken {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String token;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    @Column
    private boolean isUsed;
    @Column
    private LocalDateTime expiryTime;

    public PasswordResetToken() {
        this.isUsed = false;
        this.expiryTime = LocalDateTime.now().plusMinutes(5);
    }

    public PasswordResetToken(String token,User user) {
        this.isUsed = false;
        this.token = token;
        this.user =user;
        this.expiryTime = LocalDateTime.now().plusMinutes(5);
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryTime);
    }
}
