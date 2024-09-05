package com.zengaku.mvc.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.annotations.JsonAdapter;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.DTO.PostDTO;
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
		try {
			List<Post> postList = session.createQuery("From Post WHERE uuid = :uuid")
					.setParameter("uuid", uuid)
					.getResultList();
			for(Post p: postList) System.out.println(p.id);
			return (postList.isEmpty()) ? null : postList.get(0);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	public static List<Post> getPostsByUserObject(User user, Session session) {
		List postList = null;
		try {
			postList = session.createQuery("FROM Post WHERE author = :user")
					.setParameter("user", user)
					.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			return postList;
		}
	}

	public static List<Post> getPostsByUserObject(User user) {
		return getPostsByUserObject(user, HibernateUtils.getSessionFactory().openSession());
	}

	public static String listToJSON(List<Post> postList,long userId, Session session) {
		String json = null;
        try {
			if(postList.isEmpty()) throw new Exception();
			ObjectMapper mapper = new ObjectMapper();
			mapper.registerModule(new JavaTimeModule());
			ObjectNode objectNode = mapper.createObjectNode();
			List<PostDTO> postDTOS = new ArrayList<PostDTO>();
			for(Post post : postList){
				postDTOS.add(new PostDTO(post, TreeHeartUser.findByUUIDAndUserId(post.getUuid(), userId, session) != null));
			}
            json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(postDTOS);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
			return json;
		}
    }

}
