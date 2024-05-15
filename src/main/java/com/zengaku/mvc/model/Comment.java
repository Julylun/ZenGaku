package com.zengaku.mvc.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
     @Column
    private String commentText;
    @Column
    private LocalDateTime commentDate;
    @ManyToOne
    @JoinColumn(name ="commentAuthorId")
    private User user;
    @ManyToOne
    @JoinColumn(name ="postId")
    private Post post;
}
