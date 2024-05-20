package com.zengaku.mvc.model;

import jakarta.ejb.Local;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

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

    public RefreshToken(){
        expiryTime = LocalDateTime.now().plusDays(20);
    }

    public boolean isExpired(){
        return LocalDateTime.now().isAfter(expiryTime);
    }
}
