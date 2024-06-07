package com.zengaku.mvc.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
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

	@Column(name = "userAvatar", nullable = false)
	private String userAvatar;

//	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<PasswordResetToken> tokenList;

//	@JsonIgnore
	@JsonBackReference
	@OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
	private List<Post> postsByUser;

//	@JsonIgnore
	@OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
	private List<Comment> commentsByUser;

	public User() {
		this.userAvatar = "assets/resources/img/default-avt.png";
	}

}
