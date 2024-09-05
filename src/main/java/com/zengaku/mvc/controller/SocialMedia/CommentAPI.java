package com.zengaku.mvc.controller.SocialMedia;

import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.controller.JsonFactory;
import com.zengaku.mvc.model.Comment;
import com.zengaku.mvc.model.DTO.CommentDTO;
import com.zengaku.mvc.model.Post;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;

import org.hibernate.query.Query;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/Zentizen/post/*")
@MultipartConfig
public class CommentAPI extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/comment.jsp").forward(req,resp);
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        HttpSession httpSession = req.getSession();
        String pathInfo = req.getPathInfo();
        PrintWriter out = resp.getWriter();
        try {
            if (pathInfo == null) {
                switch (req.getParameter("type")) {
                    //  /api/comment?type=GetComments&postId=1
                    // output:  [{"id":"1","commentText":"ok","commentDate":"2024-09-02T12:36:43","author":{"id":"3"},
                    // {"id":"2","commentText":"test comment ne","commentDate":"2024-09-02T12:37:27","author":{"id":"3"}]
                    case "GetComments": {
                        String uuid = req.getParameter("uuid");
                        List<Comment> comments = getComments(databaseSession, uuid);
                        List<CommentDTO> commentDTOS = new ArrayList<>();
                        for(Comment c: comments) {
                            commentDTOS.add(new CommentDTO(
                                    c.getId(),
                                    c.getCommentText(),
                                    c.getCommentDate(),
                                    c.getAuthor().getUserFirstName() + " " + c.getAuthor().getUserLastName(),
                                    c.getAuthor().getUserAvatar(),
                                    c.getAuthor().getId(),
                                    c.getPostFather().getUuid()
                            ));
                        }
                        resp.setStatus(200);
                        out.println(JsonFactory.listToJson(commentDTOS));
                        out.flush();
                        break;
                    }
                    // /api/comment?type=SendComment&postId=1&userId=3&commentText=test comment ne
                    case "SendComment": {
                         String postUUID = req.getParameter("uuid");                         System.out.println();
                          Post postFather = Post.getPostByUUIDAndId(postUUID, databaseSession);
//                        String postId = req.getParameter("postId");
//                        Post postFather = databaseSession.get(Post.class, postId);
                        System.out.println("DEBUG: post id = " + postFather.getId() + postUUID);
                        String userId = req.getParameter("userId");
                        User Sender = User.getUserById(Long.valueOf(userId));

                        String commentText = req.getParameter("commentText");
                        databaseSession.beginTransaction();
                        databaseSession.save(new Comment(commentText, Sender, postFather));
                        databaseSession.getTransaction().commit();
                        resp.setStatus(200);
                        out.println("{\"isSuccessful\":\"" + "true" + "\"}");
                        out.flush();
                        break;
                    }
                    //   /api/comment?type=UpdateComment&commentId=2&commentText=test update comment
                    case "UpdateComment": {
                        String commentText = req.getParameter("commentText");
                        Long commendId = Long.valueOf(req.getParameter("commentId"));

                        databaseSession.beginTransaction();

                        Comment comment = databaseSession.get(Comment.class, commendId);
                        comment.setCommentText(commentText);

                        databaseSession.update(comment);

                        databaseSession.getTransaction().commit();
                        resp.setStatus(200);
                        out.println("{\"isSuccessful\":\"" + "true" + "\"}");
                        out.flush();
                        break;
                    }
                    //   /api/comment?type=DeleteComment&commentId=1
                    case "DeleteComment": {
                        Long commentId = Long.valueOf(req.getParameter("commentId"));
                        Comment comment = databaseSession.get(Comment.class, commentId);
                        databaseSession.beginTransaction();
                        databaseSession.delete(comment);
                        databaseSession.getTransaction().commit();
                        resp.setStatus(200);
                        out.println("{\"isSuccessful\":\"" + "true" + "\"}");
                        out.flush();
                        break;
                    }

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.sendError(401);
        }
    }

    private List<Comment> getComments(Session databaseSession, String postUUID) {
        try {
            String hql = "FROM Comment c WHERE  c.postFather.uuid = :uuid order by c.commentDate";
            return databaseSession.createQuery(hql)
                    .setParameter("uuid",postUUID)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }
    private List<Comment> getComments(Session databaseSession, Long postId) {
        try {
            String hql = "FROM Comment c WHERE c.postFather.id = :postId ";
            Query<Comment> query = databaseSession.createQuery(hql, Comment.class);
            query.setParameter("postId", postId);
            return query.getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String commentsToJson(List<Comment> comments) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < comments.size(); i++) {
            Comment c = comments.get(i);
            sb.append("{").append("\"id\":\"")
                    .append(c.getId()).append("\",")
                    .append("\"commentText\":\"").append(c.getCommentText()).append("\",")
                    .append("\"commentDate\":\"").append(c.getCommentDate()).append("\",")
                    .append("\"author\":{\"id\":\"").append(c.getAuthor().getId()).append("\"").append("}");
            if (i < comments.size() - 1) {
                sb.append(",");
            }
        }
        sb.append("]");
        return sb.toString();
    }

}


