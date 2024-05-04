package com.july.zengaku_full;

import com.zengaku.mvc.controller.EmailFactory;
import com.zengaku.mvc.controller.SecureFactory;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.Session;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name = "login", value = "/login")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String userName = req.getParameter("userName");
        String userPassword = req.getParameter("userPassword");
        PrintWriter out = resp.getWriter();

        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        List<User> userList =  databaseSession.createQuery("FROM User").list();
        for(User user: userList){
            if(user.getUserName().equals(userName)){
                if(user.getUserPassword().equals(SecureFactory.encode(userPassword))){
                    System.out.println("Login successfully");
                    out.println("Login successfully");

                    EmailFactory.sendMail("julylun.cat@gmail.com","Hoang Luan", 123);
                    return;
                }
            }
        }
        System.out.println("Login failed");
        out.println("Login failed");

    }
}
