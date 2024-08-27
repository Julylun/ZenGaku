package com.zengaku.mvc.controller.SocialMedia;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zengaku.mvc.controller.Exception.IncorrectProfileException;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.AuthToken;
import com.zengaku.mvc.model.Friendship;
import com.zengaku.mvc.model.Status;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import javax.security.sasl.AuthenticationException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/friendship/*")
@MultipartConfig
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
        User user = null;

        PrintWriter out = resp.getWriter();

        String accessToken = req.getParameter("accessToken");
        if(accessToken != null) {
            try {
                //Check authenticated
                if (AuthToken.isExpired(accessToken)) {
                    throw new AuthenticationException("Token is expired");
                }
                user = AuthToken.getUserByAccessToken(accessToken);
                if (user == null) {
                    throw new AuthenticationException("User doesn't exist!");
                }


                //Analyze request
                if (pathInfo == null) {
                    switch (req.getParameter("type")) {
                        // /api/friendship?type=SendFriendRequest&fromId=  3 &toId=  4
                        //JulyLun changed this case: remove get fromId from search href and replace with jwt token to
                        //sure about authentication
                        case "SendFriendRequest": {
                            System.out.println("SendFriendRequest case");
//                            String senderId = req.getParameter("fromId");
                            String receiverId = req.getParameter("toId");
//                            User Sender = User.getUserById(Long.valueOf(senderId));
                            User Sender = user;
                            User Receiver = User.getUserById(Long.valueOf(receiverId));

                            databaseSession.save(new Friendship(Sender, Receiver, Status.FriendshipStatus.PendingFriend));
                            databaseSession.close();

                            resp.setStatus(200);
                            out.println("{\"isSuccessful\":\"" + "true" + "\"}");
                            out.flush();
                            break;
                        }
                        case "CancelFriendRequest": {
                            System.out.println("CancelFriendRequest case");
                            String receiverId = req.getParameter("toId");
                            User profileUser = User.getUserById(Long.valueOf(receiverId),databaseSession);
                            if(profileUser == null) throw new IncorrectProfileException("Profile doesn't exist");

                            Friendship friendship = Friendship.getFriendShipByCouple(user,profileUser,databaseSession);

                            databaseSession.remove(friendship);
                            databaseSession.beginTransaction().commit();
                            databaseSession.close();

                            System.out.println("Remove completed");
                            resp.setStatus(200);
                            out.println("{\"isSuccessfully\":true}");
                            break;
                        }
                        // /api/friendship?type=AcceptFriendRequest&friendRequestId= 2
                        // This feature has two type: accept friend by friendRequestId or userId&profileId
                        case "AcceptFriendRequest": {
                            String friendRequestId;
                            User profileUserObj, userUserObj;

                            friendRequestId = null;
                            profileUserObj = userUserObj= null;

                            //In this case, if friendRequestId doesn't exist we will try to get profileId and userId
                            //to get their User object. Then use them to find out FriendShip object
                            //if friendRequestId exists, we just use it to find out FriendShip object.
                            friendRequestId = req.getParameter("friendRequestId");
                            if(friendRequestId == null) {
                                profileUserObj = User.getUserById(Long.valueOf(req.getParameter("toId")));
                                userUserObj = AuthToken.getUserByAccessToken(req.getParameter("accessToken"));
                                if(profileUserObj == null || userUserObj == null) throw new IncorrectProfileException("Profile doesn't exist!");
                                Friendship friendShip = Friendship.getFriendShipByCouple(profileUserObj,userUserObj,databaseSession);

                                System.out.println(friendShip == null);
                                System.out.println(!friendShip.getFromUser().equals(profileUserObj));
                                System.out.println(!friendShip.getStatus().equals(Status.FriendshipStatus.PendingFriend.toString()));
                                System.out.println(friendShip.getFromUser().getId() + " " + profileUserObj.getId());
                                if(friendShip == null ||
                                   !friendShip.getFromUser().getId().equals(profileUserObj.getId()) || //Problem is here!!
                                   !friendShip.getStatus().equals(Status.FriendshipStatus.PendingFriend.toString())
                                ) throw new IncorrectProfileException("Profile haven't sent fr request yet.");

                                databaseSession.beginTransaction();
                                friendShip.setStatus(Status.FriendshipStatus.Friend.toString());
                                databaseSession.update(friendShip);
                                databaseSession.getTransaction().commit();
                                databaseSession.close();

                                resp.setStatus(200);
                                out.println("{\"isSuccessful\":true}");
                                out.flush();
                            } else {
                                databaseSession.beginTransaction();
                                Friendship f = databaseSession.get(Friendship.class, Long.valueOf(friendRequestId));
                                if (f != null) {
                                    f.setStatus(Status.FriendshipStatus.Friend.toString());

                                    databaseSession.update(f);
                                    databaseSession.getTransaction().commit();

                                    resp.setStatus(200);
                                    out.println("{\"isSuccessful\":\"true\"}");
                                    out.flush();
                                    break;
                                }
                                break;
                            }

                            break;

                        }
                        // /api/friendship?type=GetFriends&userId= 4
                        // output:   [{"id":"1"},{"id":"2"}] or []
                        case "GetFriends": {
                            String userId = req.getParameter("userId");
                            List<Friendship> friends = getFriends(databaseSession, Long.valueOf(userId));

                            resp.setStatus(200);
                            out.println(friendsToJson(friends));
                            out.flush();
                            break;
                        }
                        // /api/friendship?type=GetFriendRequests&userId= 4
                        // output:   [{"id":"1"},{"id":"2"}] or []
                        case "GetFriendRequests": {
                            String userId = req.getParameter("userId");
                            List<Friendship> friendRequests = getFriendRequests(databaseSession, Long.valueOf(userId));

                            resp.setStatus(200);
                            out.println(friendRequestsToJson(friendRequests));
                            out.flush();
                            break;
                        }

                        case "GetFriendStatus": {
                            System.out.println("GETFFRIENDSTATUS case");
                            String profileId = req.getParameter("profileId");

                            User profileUser = User.getUserById(Long.valueOf(profileId),databaseSession);
                            if(profileUser == null) throw new IncorrectProfileException("Profile doesn't exist.");

                            String status = Friendship.getStatusFromCouple(user,profileUser,databaseSession);
                            resp.setStatus(200);
                            out.println("{\"status\":\""+ status +"\"}");
                        }

                    }
                }
            } catch (AuthenticationException ae) {
                resp.setStatus(401);
                out.println("{\"isSuccessful\":\"false\",\"error\":\""+ ae.getMessage() +"\"}");
                ae.printStackTrace();
            } catch (Exception e) {
                resp.setStatus(500);
                out.println("{\"isSuccessful\":\"false\",\"error\":\"Unknown error\"}");
                e.printStackTrace();
            }
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
