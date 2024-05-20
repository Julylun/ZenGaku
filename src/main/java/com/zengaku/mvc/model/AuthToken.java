package com.zengaku.mvc.model;

import jakarta.ejb.Local;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

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

    public AuthToken(){
        expiryTime = LocalDateTime.now().plusHours(1);
    }

    public boolean isExpired(){
        return LocalDateTime.now().isAfter(expiryTime);
    }
}
