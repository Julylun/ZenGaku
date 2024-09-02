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
	@JoinColumn(name = "commentAuthorId")
	private User author;
	@ManyToOne
	@JoinColumn(name = "postId")
	private Post postFather;

	public Comment() {

	}

	public Comment(String commentText, User author, Post postFather) {
		this.author = author;
		this.commentText = commentText;
		this.postFather = postFather;
		this.commentDate = LocalDateTime.now();
	}
}
