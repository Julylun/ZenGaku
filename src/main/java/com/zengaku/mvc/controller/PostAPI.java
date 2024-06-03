package com.zengaku.mvc.controller;

import java.io.IOException;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;

import com.google.gson.Gson;
import com.zengaku.mvc.model.Post;
import com.zengaku.mvc.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/post/*")
public class PostAPI extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Session databaseSession = HibernateUtils.getSessionFactory().openSession();
		String json;
		String pathInfo = req.getPathInfo(); // request to "/api/post/abc" => pathInfo = "/abc"

		if (pathInfo != null) {
			// get post by id
			String uuid = pathInfo.substring(1); // remove the leading '/'
			String hql = "FROM Post p WHERE p.uuid= :uuid";
			Query query = databaseSession.createQuery(hql, Post.class);
			query.setParameter("uuid", uuid);
			Post post = (Post) query.getResultList().get(0);
			json = new Gson().toJson(post);
		} else {
			// get all posts
			String hql = "FROM Post p ORDER BY p.uploadDate DESC";
			Query query = databaseSession.createQuery(hql, Post.class);
			List<Post> postList = query.getResultList();
			json = new Gson().toJson(postList);

		}

		resp.setContentType("application/json");
		resp.getWriter().write(json);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Session databaseSession = HibernateUtils.getSessionFactory().openSession();
		String pathInfo = req.getPathInfo();

		if (pathInfo == null) {
			String postText = req.getParameter("postText");
			String imageLink = req.getParameter("imageLink");
			String accessToken = req.getParameter("accessToken");

			// use and validate accessToken to find user ;

			User author = new User();
			Post post = new Post(postText, imageLink, author);
			databaseSession.save(post);
			databaseSession.close();
			System.out.println("Create new post successfully");
		}

		// redirect to home (get method ) , display all posts;

	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Session databaseSession = HibernateUtils.getSessionFactory().openSession();
		String pathInfo = req.getPathInfo();

		if (pathInfo != null) {
			String postText = req.getParameter("postText");
			String imageLink = req.getParameter("imageLink");
			String accessToken = req.getParameter("accessToken");

			// use and validate accessToken to find author of post ;

			// get post by id
			String uuid = pathInfo.substring(1); // remove the leading '/'
			String hql = "FROM Post p WHERE p.uuid= :uuid";
			Query query = databaseSession.createQuery(hql, Post.class);
			query.setParameter("uuid", uuid);
			Post post = (Post) query.getResultList().get(0);

			post.setPostText = postText;
			post.setImageLink = imageLink;

			databaseSession.update(post);
			databaseSession.close();
			System.out.println("Update  post successfully");

		}
		// redirect to home (get method ) , display all posts;

	}
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Session databaseSession = HibernateUtils.getSessionFactory().openSession();
		String pathInfo = req.getPathInfo();

		if (pathInfo != null) {

			String accessToken = req.getParameter("accessToken");

			// use and validate accessToken to find author of post ;

			// get post by id
			String uuid = pathInfo.substring(1); // remove the leading '/'
			String hql = "FROM Post p WHERE p.uuid= :uuid";
			Query query = databaseSession.createQuery(hql, Post.class);
			query.setParameter("uuid", uuid);
			Post post = (Post) query.getResultList().get(0);


			databaseSession.delete(post);
			databaseSession.close();
			System.out.println("Delete  post successfully");

		}
		// redirect to home (get method ) , display all posts;

	}
}
