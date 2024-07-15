package com.zengaku.mvc.controller.SocialMedia;

import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.Friendship;
import com.zengaku.mvc.model.Status;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.query.Query;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/friendship/*")
public class FriendshipAPI extends HttpServlet {

    private String checkStatus(String senderId, String receiverId) {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        try {
            String hql = "FROM Friendship f WHERE f.from_userid = :senderId AND f.to_userid = :receiverId ";
            Query<Friendship> query = databaseSession.createQuery(hql, Friendship.class);
            query.setParameter("senderId", senderId);
            query.setParameter("receiverId", receiverId);
            List<Friendship> friendships = query.getResultList();
            return friendships.isEmpty() ? null : friendships.get(0).getStatus();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        String pathInfo = req.getPathInfo();

        PrintWriter out = resp.getWriter();

        try {
            if (pathInfo == null) {
                switch (req.getParameter("type")) {
                    case "SendFriendRequest": {

                        String senderId = req.getParameter("fromId");
                        String receiverId = req.getParameter("toId");
                        User Sender = User.getUserById(Long.valueOf(senderId));
                        User Receiver = User.getUserById(Long.valueOf(receiverId));

                        databaseSession.save(new Friendship(Sender, Receiver, Status.FriendshipStatus.PendingFriend));
                        databaseSession.close();

                        out.println("{\"isSuccessful\":\"" + "true" + "\"}");
                        out.flush();
                        break;
                    }

                    case "AcceptFriendRequest": {
                        String friendRequestId = req.getParameter("friendRequestId");

                        databaseSession.beginTransaction();
                        Friendship f = databaseSession.get(Friendship.class, Long.valueOf(friendRequestId));
                        if (f != null) {
                            f.setStatus(Status.FriendshipStatus.Friend.toString());

                            databaseSession.update(f);
                            databaseSession.getTransaction().commit();

                            out.println("{\"isSuccessful\":\"true\"}");
                            out.flush();
                        }

                    }


                    case "GetFriends": {
                        String userId = req.getParameter("fromId");

                    }

                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }


    }
}
