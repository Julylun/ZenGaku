package com.zengaku.mvc.controller.SocialMedia;

import com.july.zengakuServlet.SocialMedia.Profile;
import com.zengaku.mvc.controller.Exception.AuthenticationException;
import com.zengaku.mvc.controller.Exception.IncorrectProfileException;
import com.zengaku.mvc.controller.Exception.Message.InvalidSessionException;
import com.zengaku.mvc.controller.Exception.Message.MissingParameterException;
import com.zengaku.mvc.controller.Exception.Token.ExpiredTokenException;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.AuthToken;
import com.zengaku.mvc.model.SocialMedia.Message;
import com.zengaku.mvc.model.User;
import jakarta.websocket.*;
        import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.*;

@ServerEndpoint(value = "/notification")
public class NotificationServerEndPoint{
    static Set<Session> users = Collections.synchronizedSet(new HashSet<>());
    static Map<Long, Session> usersHashMap = Collections.synchronizedMap(new HashMap<>());

    static org.hibernate.Session databaseSession = null;

    @OnOpen
    public void handleOpen(Session session) {
        users.add(session);
    }

    @OnMessage
    public void handleMessage(String message, Session userSession) throws IOException {
        try {
            databaseSession = HibernateUtils.getSessionFactory().openSession();
            JSONObject jsonMessage = null;
            System.out.println("[ServerEndPoint]: message -> " + message);
            jsonMessage = new JSONObject(message);
            //jsonParam: receiverId, message
            if(Objects.nonNull(userSession.getUserProperties().get("senderId"))) {
                String title = jsonMessage.getString("title");
                String content = jsonMessage.getString("content");
                String type = jsonMessage.getString("type");
                String jsonTime = jsonMessage.getString("timestamp");

                System.out.println("[NotificationServerEndpoint]<handleMessage>: title -> " + title);
                System.out.println("[NotificationServerEndpoint]<handleMessage>: content-> " + content);
                System.out.println("[NotificationServerEndpoint]<handleMessage>: type -> " + type);
                System.out.println("[NotificationServerEndpoint]<handleMessage>: jsonTime  -> " + jsonTime);
                if(Objects.isNull(title) || Objects.isNull(content) || Objects.isNull(type) || Objects.isNull(jsonTime))
                    throw new MissingParameterException("ReceiverId is missing (ReceiverId is null)");
//
//                Message messageObject = new Message(
//                        User.getUserById((Long)userSession.getUserProperties().get("senderId")),
//                        User.getUserById(Long.valueOf(receiverId)),
//                        bodyMessage
//                );
//                databaseSession.beginTransaction();
//                databaseSession.save(messageObject);
//                databaseSession.getTransaction().commit();
//
//                if(usersHashMap.containsKey(Long.valueOf(receiverId))) {
//                    System.out.println("[ServerEndPoint]: receiver is online");
//                    Session receiverSession =  usersHashMap.get(Long.valueOf(receiverId));
//                    receiverSession.getBasicRemote().sendText("{\"message\":\""+ bodyMessage +"\"}");
//                }
//                System.out.println("[ServerEndPoint]: send message successfully!");
            }


            //jsonParam: senderJwt
            else {
                System.out.println("[NotificationServerEndPoint]<handleMessage>: start connecting...");
                String senderJwt = (String)jsonMessage.get("senderJwt");
                Long senderId = AuthToken.getUserIdByAccessToken(senderJwt);
                System.out.println("[NotificationServerEndPoint]<handleMessage>: SenderJwt ->" + senderJwt);
                System.out.println("[NotificationServerEndPoint]<handleMessage>: SenderId ->" + senderId);
                if(AuthToken.isExpired(senderJwt)) throw new ExpiredTokenException("Jwt doesn't exist or be expired");
                if(!User.isUserExist(senderId,databaseSession)) throw new IncorrectProfileException("User profile doesn't exist");
                userSession.getUserProperties().put("senderId",senderId);
                usersHashMap.put(senderId,userSession);
                System.out.println("[NotificationServerEndPoint]<handleMessage>: Connect successfully!");
            }
        } catch (JSONException je) {
            je.printStackTrace();
        }
        catch (Exception e) {
            e.printStackTrace();
        } finally {
            databaseSession.close();
        }

    }

    @OnClose
    public void handleClose(Session session) {
        usersHashMap.remove((Long)session.getUserProperties().get("senderId"));
        users.remove(session);
    }

    @OnError
    public void handleError(Throwable t) {
        t.printStackTrace();
    }

}
