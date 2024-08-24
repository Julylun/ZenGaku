package com.zengaku.mvc.controller.SocialMedia;

import java.io.*;
import java.net.Authenticator;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
//import com.zengaku.mvc.model.LocalDateTimeTypeAdapter;
import com.zengaku.mvc.controller.GoogleUtils;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.controller.LanguageFilter;
import com.zengaku.mvc.model.*;
import com.zengaku.mvc.model.DTO.GoogleRes;
import com.zengaku.mvc.model.DTO.PostDTO;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.*;
import lombok.Data;
import org.apache.commons.io.FileUtils;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import com.fasterxml.jackson.datatype.jsr310.*;

import static java.util.Collections.replaceAll;


@WebServlet("/api/post/*")
@MultipartConfig
public class PostAPI extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Session databaseSession = HibernateUtils.getSessionFactory().openSession();
		Transaction transaction = databaseSession.getTransaction();
		HttpSession httpSession = req.getSession();
		String pathInfo = req.getPathInfo();
		try {
			if (pathInfo == null) {
				switch (req.getParameter("type")){
					case "getPost":{
							String json;
							String userId = null;
							if(req.getSession().getAttribute("adminAuth") == null) {
								userId = req.getParameter("userId");
								System.out.println("[PostAPI]<doPost - getPost>: userId: " + userId);
								if(userId == null || userId.equals("undefined")){
//									resp.sendError(401);
									req.getRequestDispatcher("401").forward(req,resp);
									System.out.println("HIII");
									return;
								}
							}

							String hql = "FROM Post p ORDER BY p.uploadDate DESC ";
							Query query = databaseSession.createQuery(hql, Post.class);
							List<Post> postList = query.getResultList();

							ObjectMapper mapper = new ObjectMapper();
							mapper.registerModule(new JavaTimeModule());
							ObjectNode objectNode = mapper.createObjectNode();
							List<PostDTO> postDTOS = new ArrayList<PostDTO>();
							for(Post post : postList){
								postDTOS.add(new PostDTO(post, TreeHeartUser.findByUUIDAndUserId(post.getUuid(), userId, databaseSession) != null));
							}
							json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(postDTOS);

							resp.setContentType("application/json");
							resp.getWriter().write(json);
						break;
					}
					case "upPost": {
						String caption = LanguageFilter.filterBadWords(req.getParameter("caption"));
						Part imagePart = req.getPart("image");
						String accessToken = req.getParameter("accessToken");
						User user = AuthToken.getUserByAccessToken(accessToken);

						System.out.println(caption + " " + imagePart + " " + accessToken);

						String fileName = imagePart.getSubmittedFileName();
						File imageFile = File.createTempFile(user.getId() + "_avt_img",fileName.substring(fileName.lastIndexOf('.')));

						InputStream is = imagePart.getInputStream();
						OutputStream os = new FileOutputStream(imageFile);
						{
							byte[] buffer = new byte[1024];
							int tmpLength;
							while ((tmpLength = is.read(buffer)) != -1) {
								os.write(buffer, 0, tmpLength);
							}
						}

						GoogleRes googleRes = GoogleUtils.uploadImageToDrive(imageFile,GoogleUtils.AVATAR_FOLDER_ID);
						PrintWriter out = resp.getWriter();

						if(googleRes.getStatus() == 200){
							Post post = new Post(caption, googleRes.getUrl(), user);
							databaseSession.save(post);
							databaseSession.close();
							System.out.println(
									PrintColor.GREEN_BOLD_BRIGHT + "--- --- --- Up Post --- --- ---\n" +
											PrintColor.GREEN +
											"User id: " + user.getId() + "\n" +
											"Username: " + user.getUserName() + "\n" +
											"User full name: " + user.getUserFirstName() + " " + user.getUserLastName() + "\n" +
											"Status: Successful\n" +
											"Caption: " + post.getPostText().substring(0,Math.min(post.getPostText().length()-1,20)) + "\n" +
											"Image link: " + post.getImageLink() + "\n" +
											PrintColor.GREEN_BOLD +	"IP Address" + req.getRemoteAddr() + "\n" +
											"Local Address" + req.getLocalAddr() + "\n" +
											PrintColor.GREEN_BOLD_BRIGHT + "-------------------------------------\n" +
											PrintColor.RESET
							);
							imageFile.delete();
							System.out.println(post.getPostText());
							out.println("{\"isSuccessful\":\"true\"," +
									"\"uuid\":" + "\"" + post.getUuid() + "\"," +
									"\"authorAvatarLink\":" + "\"" + post.getAuthor().getUserAvatar() + "\"," +
									"\"authorFirstName\":" + "\"" + post.getAuthor().getUserFirstName() + "\"," +
									"\"authorLastName\":" + "\"" + post.getAuthor().getUserLastName() + "\"," +
									"\"uploadDate\":" + "\"" + post.getUploadDate().toString() + "\"," +
									"\"imageLink\":" + "\"" + post.getImageLink() + "\"," +
									"\"treeNumber\":" + "\"" + post.getTreeHeartNumber() + "\"," +
									"\"caption\":" + "\"" +  post.getPostText().replace("\r","").replace("\n"," ") + "\"" +
									"}");
							out.flush();
							return;
						}
						imageFile.delete();
						System.out.println(
								PrintColor.GREEN_BOLD_BRIGHT + "--- --- --- Up Post --- --- ---\n" +
										PrintColor.RED_UNDERLINED +
										"User id: " + user.getId() + "\n" +
										"Username: " + user.getUserName() + "\n" +
										"User full name: " + user.getUserFirstName() + " " + user.getUserLastName() + "\n" +
										"Status: Failed\n" +
										PrintColor.GREEN_BOLD +	"IP Address" + req.getRemoteAddr() + "\n" +
										"Local Address" + req.getLocalAddr() + "\n" +
										PrintColor.GREEN_BOLD_BRIGHT + "-------------------------------------\n" +
										PrintColor.RESET
						);
						out.println("{\"isSuccessful\":\""+ "false" + "\"}");
						out.flush();
						break;
					}
					case "editPost": {
						if(httpSession.getAttribute("adminAuth").equals("true")) {
							String id = req.getParameter("id");
							String uuid = req.getParameter("uuid");
							String postText = req.getParameter("postText");
							String imageLink = req.getParameter("imageLink");
							String treeHeartNumber = req.getParameter("treeHeartNumber");
							System.out.println("[PostAPI]<doPost - editPost>: id:" + id + " - uuid: " + uuid +
									" - postText: " + postText + " - imageLink: " + imageLink + " - treeHeartNumber: "
									+ treeHeartNumber );

							Post currentPost = databaseSession.get(Post.class,Integer.parseInt(id));
							currentPost.setUuid(uuid);
							currentPost.setPostText(postText);
							currentPost.setImageLink(imageLink);
							currentPost.setTreeHeartNumber(Integer.parseInt(treeHeartNumber));
							databaseSession.update(currentPost);
							databaseSession.beginTransaction().commit();
							databaseSession.close();
							System.out.println("[PostAPI]<doPost - editPost>: Completed");
						} else {
							System.out.println("[PostAPI]<doPost - editPost>: U're not administrator");
							return;
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.sendError(401);
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

//			post.setPostText = postText;
//			post.setImageLink = imageLink;
			post.setPostText(postText);
			post.setImageLink(imageLink);

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
