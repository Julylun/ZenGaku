package com.zengaku.mvc.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "post")
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String uuid;
	@Column(nullable = false)
	private String postText;
	@Column(nullable = false)
	private String imageLink;
	@Column(nullable = false)
	private LocalDateTime uploadDate;
	@Column(nullable = false)
	private int treeHeartNumber;
	@ManyToOne
	@JoinColumn(name = "postAuthorId")
	private User author;

	@OneToMany(mappedBy = "postFather", cascade = CascadeType.ALL)
	private List<Comment> commentsInPost;

	public Post() {

	}

	public Post(String postText, String imageLink, User author) {
		this.author = author;
		this.uuid = String.valueOf(UUID.randomUUID());
		this.postText = postText;
		this.imageLink = imageLink;
		this.uploadDate = LocalDateTime.now();
		this.treeHeartNumber = 0;

	}

}
