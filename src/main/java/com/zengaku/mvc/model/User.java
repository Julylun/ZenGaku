package com.zengaku.mvc.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.source.tree.Tree;
import com.zengaku.mvc.controller.HibernateUtils;
import jakarta.persistence.*;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Session;
import org.json.JSONObject;

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

	@Column(name = "savedData")
	private String savedData;

//	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<PasswordResetToken> tokenList;

	@JsonIgnore
	@JsonBackReference
	@OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
	private List<Post> postsByUser;

//	@JsonIgnore
	@OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
	private List<Comment> commentsByUser;

	@JsonBackReference
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Notification> notificationsByUser;

	@JsonBackReference
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<TreeHeartUser> treeHeartUsers;

	public static User getUserById(Long userId){
		try{
			Session session = HibernateUtils.getSessionFactory().openSession();
			User user = session.get(User.class,userId);
			return user;
		} catch (Exception e) {
			return null;
		}
	}

	public static User getUserById(Long userId, Session session){
		try{
			User user = session.get(User.class,userId);
			return user;
		} catch (Exception e) {
			return null;
		}
	}

	public User() {
		this.userAvatar = "assets/resources/img/default-avt.png";
	}

	/**
	 * Put User object and JSONObject object to this function then it will put user's information to
	 * your JSONObject and that information will name with a string (@param jsonName).
	 * @param user
	 * @param jsonObject
	 * @param jsonName
	 * @return
	 */
	public static JSONObject getUserJson(User user, JSONObject jsonObject, String jsonName) {
		JSONObject leafJson = null;
		try {
			leafJson = new JSONObject();

			leafJson.put("username", user.getUserName());
			leafJson.put("firstname", user.getUserFirstName());
			leafJson.put("lastname", user.getUserLastName());
			leafJson.put("userAvatar", user.getUserAvatar());

			jsonObject.put(jsonName, leafJson);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			System.out.println("[User]<getUserJson>: jsonString -> " + jsonObject.toString());
		}
		return jsonObject;
	}

}
