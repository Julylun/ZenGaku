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
                    // /api/friendship?type=SendFriendRequest&fromId=  3 &toId=  4
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
                    // /api/friendship?type=AcceptFriendRequest&friendRequestId= 2
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
                        break;

                    }
                    // /api/friendship?type=GetFriends&userId= 4
                    // output:   [{"id":"1"},{"id":"2"}] or []
                    case "GetFriends": {
                        String userId = req.getParameter("userId");
                        List<Friendship> friends = getFriends(databaseSession, Long.valueOf(userId));
                        out.println(friendsToJson(friends));
                        out.flush();
                        break;
                    }
                    // /api/friendship?type=GetFriendRequests&userId= 4
                    // output:   [{"id":"1"},{"id":"2"}] or []
                    case "GetFriendRequests": {
                        String userId = req.getParameter("userId");
                        List<Friendship> friendRequests = getFriendRequests(databaseSession, Long.valueOf(userId));
                        out.println(friendRequestsToJson(friendRequests));
                        out.flush();
                        break;
                    }

                }
            }

        } catch (Exception e) {
            out.println("{\"isSuccessful\":\"false\"}");
            e.printStackTrace();
        }


    }

    private List<Friendship> getFriends(Session databaseSession, Long userId) {
        String hql = "FROM Friendship f WHERE (f.fromUser.id = :userId OR f.toUser.id = :userId) AND f.status = :status";
        Query<Friendship> query = databaseSession.createQuery(hql, Friendship.class);
        query.setParameter("userId", userId);
        query.setParameter("status", Status.FriendshipStatus.Friend.toString());
        return query.getResultList();
    }

    private List<Friendship> getFriendRequests(Session databaseSession, Long userId) {
        String hql = "FROM Friendship f WHERE f.toUser.id = :userId AND f.status = :status";
        Query<Friendship> query = databaseSession.createQuery(hql, Friendship.class);
        query.setParameter("userId", userId);
        query.setParameter("status", Status.FriendshipStatus.PendingFriend.toString());
        return query.getResultList();
    }

    private String friendsToJson(List<Friendship> friends) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < friends.size(); i++) {
            Friendship f = friends.get(i);
            sb.append("{\"id\":\"").append(f.getId()).append("\"}");
            if (i < friends.size() - 1) {
                sb.append(",");
            }
        }
        sb.append("]");
        return sb.toString();
    }

    private String friendRequestsToJson(List<Friendship> friendRequests) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < friendRequests.size(); i++) {
            Friendship f = friendRequests.get(i);
            sb.append("{\"id\":\"").append(f.getId()).append("\"}");
            if (i < friendRequests.size() - 1) {
                sb.append(",");
            }
        }
        sb.append("]");
        return sb.toString();
    }
}
