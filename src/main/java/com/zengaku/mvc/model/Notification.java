package com.zengaku.mvc.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "type")
    private int type;

    @Column(name = "seen")
    private boolean seen;

    @Column(name = "notificationTime")
    private LocalDateTime dateTime;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}
