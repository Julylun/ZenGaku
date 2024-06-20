package com.zengaku.mvc.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zengaku.mvc.model.AuthToken;
import com.zengaku.mvc.model.DTO.NotificationDTO;
import com.zengaku.mvc.model.DTO.PostDTO;
import com.zengaku.mvc.model.Notification;
import com.zengaku.mvc.model.Post;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
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

@WebServlet("/api/notification")
public class NotificationAPI extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        String json;
        String accessToken = req.getParameter("accessToken");
        User user = AuthToken.getUserByAccessToken(accessToken);
        // get all notification
        try {
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
            resp.setContentType("application/json");
            resp.getWriter().write(json);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
