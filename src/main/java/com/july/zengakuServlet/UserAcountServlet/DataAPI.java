package com.july.zengakuServlet.UserAcountServlet;

import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.controller.TokenUtils;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.io.IOException;

@WebServlet("/api/user/data")
@MultipartConfig
public class DataAPI extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        switch (req.getParameter("type")) {
            case "savedData":{
                savedDataCase(req,resp);
                break;
            }
        }
    }

    private void savedDataCase(HttpServletRequest req, HttpServletResponse resp) {
        try {
            String userAccessToken = req.getParameter("accessToken");
            String userData = req.getParameter("data");
            long userId = TokenUtils.getIdByJWT(userAccessToken);
            System.out.println("[DataAPI]<savedDataCase>: userId -> " + userId);
            if(userId == -1) {
                resp.sendError(401);
                return;
            }
            Session session = HibernateUtils.getSessionFactory().openSession();
            Transaction transaction = session.beginTransaction();
            User user = session.get(User.class,userId);
            if(user == null) {
                resp.sendError(401);
                return;
            }
            user.setSavedData(userData);
            session.saveOrUpdate(user);
            transaction.commit();
            session.close();
            resp.sendError(200);
            System.out.println("[DataAPI]<savedDataCase>: User data is saved!");
        } catch (Exception e) {
            try {
                resp.sendError(500);
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            e.printStackTrace();
        }
    }
}
