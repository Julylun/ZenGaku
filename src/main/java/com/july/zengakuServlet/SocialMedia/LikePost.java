package com.july.zengakuServlet.SocialMedia;

import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.Post;
import com.zengaku.mvc.model.PrintColor;
import com.zengaku.mvc.model.TreeHeartUser;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.apache.http.impl.io.SessionOutputBufferImpl;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@WebServlet(value = "/social/api/likePost")
@MultipartConfig
public class LikePost extends HttpServlet {
    public static TreeHeartUser isAlreadyLike(String uuid, String userId, Session session){
        Query query = session.createQuery("From TreeHeartUser as thu WHERE thu.user.id = :userId and thu.post.uuid = :uuid");
        query.setParameter("uuid",uuid);
        query.setParameter("userId",userId);
        List<TreeHeartUser> list = query.getResultList();
        return (list.isEmpty()) ? null : list.get(0);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp
        try{
            System.out.println(PrintColor.YELLOW_BOLD_BRIGHT + "--- LikePost Post ---" + PrintColor.RESET);
            System.out.println(PrintColor.GREEN + "Time " + LocalDateTime.now() + PrintColor.RESET);
            System.out.println(PrintColor.GREEN + "IP Address: " + req.getRemoteAddr() + PrintColor.RESET);
            System.out.println(PrintColor.GREEN + "Local Address: " + req.getLocalAddr()+ PrintColor.RESET);

            String uuid = req.getParameter("postUUID");
            String userId = req.getParameter("userId");

            System.out.println("LikePost - " + uuid + " " + userId);

            Session session = HibernateUtils.getSessionFactory().openSession();
            Transaction transaction = session.beginTransaction();
            Post post;
            post = Post.getPostByUUIDAndId(uuid,session);
            if(isAlreadyLike(uuid,userId,session) == null){
                System.out.println("1");
                post.setTreeHeartNumber(post.getTreeHeartNumber() + 1);
                TreeHeartUser treeHeartUser = new TreeHeartUser(
                        User.getUserById(Long.valueOf(userId)),
                        post
                );
                session.save(treeHeartUser);
                session.saveOrUpdate(post);
                transaction.commit();
            } else {
                System.out.println("2");
                session.remove(TreeHeartUser.findByUUIDAndUserId(uuid,userId,session));
                post.setTreeHeartNumber(post.getTreeHeartNumber() - 1);
                session.saveOrUpdate(post);
                transaction.commit();
            }

            session.close();


            System.out.println(req.getSession().getAttribute("loginStatus"));
            System.out.println(PrintColor.GREEN + "uid post: " + req.getLocalAddr()+ PrintColor.RESET);
            resp.getWriter().write("{\"isApprove\":\"true\"}");
        } catch (Exception e){
            e.printStackTrace();
            resp.getWriter().write("{\"isApprove\":\"false\"}");
        }
        resp.getWriter().flush();
    }
}
