package com.zengaku.mvc.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Entity
public class PasswordResetToken {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String token;
    private User user;
    private boolean isUsed;
    private LocalDateTime expiryTime;

    public PasswordResetToken() {
        this.isUsed = false;
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryTime);
    }
}
