package com.zengaku.mvc.controller.SocialMedia;

import com.july.zengakuServlet.SocialMedia.Profile;
import com.zengaku.mvc.controller.Exception.AuthenticationException;
import com.zengaku.mvc.controller.Exception.IncorrectProfileException;
import com.zengaku.mvc.controller.Exception.Message.InvalidSessionException;
import com.zengaku.mvc.controller.Exception.Message.MissingParameterException;
import com.zengaku.mvc.controller.Exception.Token.ExpiredTokenException;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.controller.JsonFactory;
import com.zengaku.mvc.model.AuthToken;
import com.zengaku.mvc.model.DTO.NotificationDTO;
import com.zengaku.mvc.model.Notification;
import com.zengaku.mvc.model.SocialMedia.Message;
import com.zengaku.mvc.model.User;
import jakarta.websocket.*;
        import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONException;
import org.json.JSONObject;
import com.zengaku.mvc.model.Constant.NotificationConstant;

import javax.json.Json;
import java.io.IOException;
import java.time.LocalDateTime;
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

            if(Objects.nonNull(userSession.getUserProperties().get("senderId"))) {
                String type = jsonMessage.getString("type");
                if(Objects.isNull(type)) throw new MissingParameterException("type is null");
                switch (Integer.parseInt(type)) {
                    case NotificationConstant.Type.NONE: {
                        noneCase(jsonMessage, databaseSession);
                        break;
                    }
                    case NotificationConstant.Type.ADD_FRIEND_REQUEST: {
                        addFriendRequestCase(jsonMessage, userSession, databaseSession);
                        break;
                    }
                    case NotificationConstant.Type.MESSAGE: {
                        messageCase(jsonMessage, userSession,databaseSession);
                        break;
                    }
                }

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

    private void addFriendRequestCase(JSONObject jsonMessage, Session userSession, org.hibernate.Session databaseSession) throws MissingParameterException, IncorrectProfileException, IOException {
        String title = jsonMessage.getString("title");
        JSONObject content = jsonMessage.getJSONObject("content");
        Long receiverId = Long.valueOf(jsonMessage.getString("receiverId"));
        User user = null;
        Session receiverSession = null;

        System.out.println("[NotificationServerEndpoint]<handleMessage>: title -> " + title);
        System.out.println("[NotificationServerEndpoint]<handleMessage>: content-> " + content);
        if(Objects.isNull(receiverId) || Objects.isNull(title) || Objects.isNull(content)) {
            throw new MissingParameterException("ReceiverId is missing (ReceiverId is null)");
        }
        user = User.getUserById(receiverId,databaseSession);
        if(Objects.isNull(user)) throw new IncorrectProfileException("Receiver is null");

        databaseSession.beginTransaction();

        Notification notification = new Notification();
        String contentString = "{\"message\":\"" + content.getString("message") + "\",\"senderId\":" + content.getString("senderId") + "}";
        notification.setContent(contentString);
        notification.setType(NotificationConstant.Type.ADD_FRIEND_REQUEST);
        notification.setSeen(false);
        notification.setDateTime(LocalDateTime.now());
        notification.setTitle(title);
        notification.setUser(user);

        databaseSession.save(notification);
        databaseSession.getTransaction().commit();

        receiverSession = usersHashMap.get(receiverId);

        System.out.println("[NotificationServerEndPoint]<messageCase>: result string -> " + JsonFactory.objectToJsonString(new NotificationDTO(notification)));
        if(Objects.nonNull(receiverSession)) {
            System.out.println("[NotificationServerEndPoint]<messageCase>: User is online");
            receiverSession.getBasicRemote().sendText(JsonFactory.objectToJsonString(new NotificationDTO(notification)));
            return;
        }
    }

    private void messageCase(JSONObject jsonMessage, Session userSession, org.hibernate.Session databaseSession) throws MissingParameterException, IncorrectProfileException, IOException {
        String title = jsonMessage.getString("title");
        JSONObject content = jsonMessage.getJSONObject("content");
        Long receiverId = Long.valueOf(jsonMessage.getString("receiverId"));
        User user = null;
        Session receiverSession = null;

        System.out.println("[NotificationServerEndpoint]<handleMessage>: title -> " + title);
        System.out.println("[NotificationServerEndpoint]<handleMessage>: content-> " + content);
        if(Objects.isNull(receiverId) || Objects.isNull(title) || Objects.isNull(content)) {
            throw new MissingParameterException("ReceiverId is missing (ReceiverId is null)");
        }
        user = User.getUserById(receiverId,databaseSession);
        if(Objects.isNull(user)) throw new IncorrectProfileException("Receiver is null");

        databaseSession.beginTransaction();

        Notification notification = new Notification();
        String contentString = "{\"message\":\"" + content.getString("message") + "\",\"senderId\":" + content.getString("senderId") + "}";
        notification.setContent(contentString);
        notification.setType(NotificationConstant.Type.MESSAGE);
        notification.setSeen(false);
        notification.setDateTime(LocalDateTime.now());
        notification.setTitle(title);
        notification.setUser(user);

        databaseSession.save(notification);
        databaseSession.getTransaction().commit();

        receiverSession = usersHashMap.get(receiverId);

        System.out.println("[NotificationServerEndPoint]<messageCase>: result string -> " + JsonFactory.objectToJsonString(new NotificationDTO(notification)));
        if(Objects.nonNull(receiverSession)) {
            System.out.println("[NotificationServerEndPoint]<messageCase>: User is online");
            receiverSession.getBasicRemote().sendText(JsonFactory.objectToJsonString(new NotificationDTO(notification)));
            return;
        }
    }
    private void noneCase(JSONObject jsonMessage, org.hibernate.Session databaseSession) throws MissingParameterException, IncorrectProfileException, IOException {
        String title = jsonMessage.getString("title");
        String content = jsonMessage.getString("content");
        Long receiverId = Long.valueOf(jsonMessage.getString("receiverId"));
        User user = null;
        Session receiverSession = null;

        System.out.println("[NotificationServerEndpoint]<handleMessage>: title -> " + title);
        System.out.println("[NotificationServerEndpoint]<handleMessage>: content-> " + content);
        if(Objects.isNull(receiverId) || Objects.isNull(title) || Objects.isNull(content)) {
            throw new MissingParameterException("ReceiverId is missing (ReceiverId is null)");
        }
        user = User.getUserById(receiverId,databaseSession);
        if(Objects.isNull(user)) throw new IncorrectProfileException("Receiver is null");

        databaseSession.beginTransaction();

        Notification notification = new Notification();

        notification.setContent(content);
        notification.setType(NotificationConstant.Type.NONE);
        notification.setSeen(false);
        notification.setDateTime(LocalDateTime.now());
        notification.setTitle(title);
        notification.setUser(user);

        databaseSession.save(notification);
        databaseSession.getTransaction().commit();

        receiverSession = usersHashMap.get(receiverId);

        System.out.println("[NotificationServerEndPoint]<nonCase>: result string -> " + JsonFactory.objectToJsonString(new NotificationDTO(notification)));
        if(Objects.nonNull(receiverSession)) {
            System.out.println("[NotificationServerEndPoint]<nonCase>: User is online");
            receiverSession.getBasicRemote().sendText(JsonFactory.objectToJsonString(new NotificationDTO(notification)));
            return;
        }
    }

}
