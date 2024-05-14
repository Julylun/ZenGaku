package com.zengaku.mvc.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

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

    @Column(name = "userFirstName", nullable = false)
    private String userFirstName;

    @Column(name = "userLastName", nullable = false)
    private String userLastName;

    @Column(name = "userBirthday", nullable = false)
    private LocalDate userBirthday;

    @OneToMany(mappedBy = "user")
    private List<PasswordResetToken> tokenList;
}
