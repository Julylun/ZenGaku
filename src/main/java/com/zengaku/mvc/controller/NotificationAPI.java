package com.zengaku.mvc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zengaku.mvc.controller.Exception.AuthenticationException;
import com.zengaku.mvc.controller.Exception.IncorrectProfileException;
import com.zengaku.mvc.controller.Exception.Token.ExpiredTokenException;
import com.zengaku.mvc.model.*;
import com.zengaku.mvc.model.DTO.NotificationDTO;
import com.zengaku.mvc.model.DTO.PostDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.query.Query;

import java.io.IOException;
import java.net.Authenticator;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@WebServlet("/api/notification")
@MultipartConfig
public class NotificationAPI extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        // get all notification
        try {
            String json;
            String accessToken = req.getParameter("accessToken");
            if(AuthToken.isExpired(accessToken)) throw new ExpiredTokenException("[NotificationAPI]<doPost>: Access token is expired");
            User user = AuthToken.getUserByAccessToken(accessToken);
            if(Objects.isNull(user)) throw new AuthenticationException("[NotificationAPI]<doPost>: User is null");
            getNotification(req,resp,user,databaseSession);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void getNotification(HttpServletRequest req, HttpServletResponse resp ,User user, Session databaseSession)
            throws IOException
    {
        String json = null;
        String hql = "FROM Notification n WHERE :id = n.user.id ORDER BY n.dateTime DESC";
        Query query = databaseSession.createQuery(hql, Notification.class);
        query.setParameter("id",user.getId());
        List<Notification> notifications = query.getResultList();

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        List<NotificationDTO> notificationDTOS = new ArrayList<NotificationDTO>();
        for (Notification notification : notifications) {
            notificationDTOS.add(new NotificationDTO(notification));
        }
        json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(notificationDTOS);
//        System.out.println("[NotificationAPI]<getNotification>: jsonString -> " + json);
        resp.setContentType("application/json");
        resp.getWriter().write(json);
    }
}
