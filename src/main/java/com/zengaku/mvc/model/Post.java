package com.zengaku.mvc.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String uid;

    @Column(nullable = false)
    private String imageLink;
    @Column(nullable = false)
    private LocalDateTime uploadDate;
    @Column(nullable = false)
    private int treeHeartNumber;
    @ManyToOne
    @JoinColumn(name = "postAuthorId")
    private User author;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> commentsInPost;


}
