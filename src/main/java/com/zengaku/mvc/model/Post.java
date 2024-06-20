package com.zengaku.mvc.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.google.gson.annotations.JsonAdapter;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import com.fasterxml.jackson.datatype.jsr310.*;
import org.hibernate.Session;

@Data
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
//	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", shape = JsonFormat.Shape.STRING)
	@Column(nullable = false)
	private LocalDateTime uploadDate;
	@Column(nullable = false)
	private int treeHeartNumber;

//	@JsonIgnore
	@JsonManagedReference
	@ManyToOne
	@JoinColumn(name = "postAuthorId")
	private User author;

	@OneToMany(mappedBy = "postFather", cascade = CascadeType.ALL)
//	@JsonIgnore
	private List<Comment> commentsInPost;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	private List<TreeHeartUser> treeHeartUsers;

	public Post() {

	}

	public Post(String postText, String imageLink, User author) {
		this.author = author;
		this.uuid = String.valueOf(UUID.randomUUID());
		this.postText = postText;
		this.imageLink = imageLink;
		this.uploadDate = LocalDateTime.now();
		this.treeHeartNumber = 0;
		this.treeHeartUsers = new ArrayList<>();

	}

	public static Post getPostByUUIDAndId(String uuid, Session session){
		List<Post> postList = session.createQuery("From Post WHERE uuid = :uuid")
				.setParameter("uuid", uuid)
				.getResultList();
		return (postList.isEmpty()) ? null : postList.get(0);
	}

}
