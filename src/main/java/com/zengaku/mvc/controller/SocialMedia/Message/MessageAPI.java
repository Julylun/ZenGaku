package com.zengaku.mvc.controller.SocialMedia.Message;

import com.zengaku.mvc.controller.Exception.IncorrectProfileException;
import com.zengaku.mvc.controller.Exception.Message.MissingParameterException;
import com.zengaku.mvc.controller.Exception.Message.NoMessageException;
import com.zengaku.mvc.controller.Exception.Token.ExpiredTokenException;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.controller.JsonFactory;
import com.zengaku.mvc.model.AuthToken;
import com.zengaku.mvc.model.DTO.MessageDTO;
import com.zengaku.mvc.model.DTO.UserDTO;
import com.zengaku.mvc.model.SocialMedia.Message;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@WebServlet("/Zentizen/messages/direct")
@MultipartConfig
public class MessageAPI extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/inbox.jsp").forward(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();

        System.out.println("[MessageAPI]<doPost>: getting chat..");
        System.out.println("[MessageAPI]<doPost>: type -> " + req.getParameter("type"));

        switch (req.getParameter("type")) {
            case "GET_CHAT_STORY": {
                getChatStory(req,resp);
                break;
            }
            case "GET_MESSAGES": {
                getMessages(req,resp);
                break;
            }
        }
    }

    public void getMessages(HttpServletRequest req, HttpServletResponse resp) {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        try {
            String senderJwt = req.getParameter("accessToken");
            if(AuthToken.isExpired(senderJwt)) throw new ExpiredTokenException("Access token is expired");
            User senderUser = AuthToken.getUserByAccessToken(senderJwt);
            if(Objects.isNull(senderUser)) throw new IncorrectProfileException("SenderUser is null");

            String HQL = "FROM Message message WHERE (message.sendTime = (SELECT MAX(message2.sendTime) FROM Message message2 WHERE (message2.fromUser = message.fromUser AND message2.toUser.id = :userId)) AND message.toUser.id = :userId) ORDER BY message.sendTime DESC";

            List<Message> messageList = databaseSession.createQuery(HQL)
                    .setParameter("userId",senderUser.getId())
                    .getResultList();
            List<UserDTO> userDTOList = new ArrayList<>();
            for(Message message: messageList) {
                System.out.println(message.getBodyText());
                userDTOList.add(new UserDTO(Objects.equals(message.getFromUser().getId(),senderUser.getId()) ? message.getToUser() : message.getFromUser()));
//                System.out.println(userDTOList.getLast().);
            }
            List<MessageDTO> messageDTOList = MessageDTO.messageListToDTOList(messageList,senderUser);
            resp.setStatus(200);
            resp.getWriter().println("{\"isSuccessful\":true,\"hasMessages\":true,\"messages\":"+ JsonFactory.listToJson(messageDTOList) +", \"usersInfo\":"+ JsonFactory.listToJson(userDTOList) +"}");
        } catch (ExpiredTokenException e) {
            throw new RuntimeException(e);
        } catch (IncorrectProfileException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public void getChatStory(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        JSONObject jsonObject =  new JSONObject();
        try {
            System.out.println("[MessageAPI]<getChatStory>: hello world!");
            String senderJwt = req.getParameter("accessToken");
            String receiverId = req.getParameter("receiverId");

            if(Objects.isNull(senderJwt) || Objects.isNull(receiverId)) throw new MissingParameterException("accessToken or receiverId is missing (null)");
            if(AuthToken.isExpired(senderJwt)) throw new ExpiredTokenException("senderJwt is expired");

            User receiverUser = User.getUserById(Long.valueOf(receiverId),databaseSession);
            User senderUser = AuthToken.getUserByAccessToken(senderJwt);

            if(Objects.isNull(receiverUser) || Objects.isNull(senderUser)) throw new IncorrectProfileException("Sender or receiver doesn't exist");

            String hqlQuery = "FROM Message WHERE ((fromUser =:sender AND toUser = :receiver) OR (fromUser =:receiver AND toUser =:sender)) ORDER BY sendTime";
            User.getUserJson(receiverUser,jsonObject,"receiver");
            List<Message> messageList = databaseSession.createQuery(hqlQuery)
                    .setParameter("sender", senderUser)
                    .setParameter("receiver", receiverUser)
                    .getResultList();
            if(messageList.isEmpty()) throw new NoMessageException("Result list is empty");
            String senderMessage = JsonFactory.listToJson(MessageDTO.messageListToDTOList(messageList,senderUser));
            System.out.println(jsonObject.toString());
            resp.setStatus(200);
            resp.getWriter().println("{\"isSuccessful\":true, \"hasMessages\":true, \"messages\":"+ senderMessage + ",\"usersInformation\":" + jsonObject.toString() + "}");
        } catch (ExpiredTokenException ete) {
            ete.printStackTrace();
            resp.getWriter().println("{\"isSuccessful\":false, \"errorType\":\"EXPIRED_TOKEN\"}");
        } catch (IncorrectProfileException e) {
            e.printStackTrace();
            resp.setStatus(401);
            resp.getWriter().println("{\"isSuccessful\":false, \"errorType\":\"INCORRECT_PROFILE\"}");
        } catch (MissingParameterException e) {
            e.printStackTrace();
            resp.getWriter().println("{\"isSuccessful\":false, \"errorType\":\"MISSING_PARAMETER\"}");
        } catch (NoMessageException nme) {
            nme.printStackTrace();
            resp.setStatus(200);
            resp.getWriter().println("{\"isSuccessful\":true, \"hasMessages\":false, \"errorType\":\"NO_MESSAGES\", \"usersInformation\":" + jsonObject.toString() + "}");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(500);
            resp.getWriter().println("{\"isSuccessful\":false, \"errorType\":\"UNKNOWN_ERROR\"}");
        }


    }
}
