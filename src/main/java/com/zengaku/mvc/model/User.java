package com.zengaku.mvc.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user")
public @Data class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "userName", nullable = false)
    private String userName;

    @Column(name = "userPassword", nullable = false)
    private String userPassword;

    @Column(name = "userEmail", nullable = false)
    private String userEmail;
}
