package com.july.zengaku_full.UserAcountServlet;

import com.zengaku.mvc.controller.EmailFactory;
import com.zengaku.mvc.controller.SecureFactory;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.RegisterCode;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
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
        HttpSession httpSession = req.getSession();
        for(User user: userList){
            if(user.getUserName().equals(userName)){
                if(user.getUserPassword().equals(SecureFactory.encode(userPassword))){
                    httpSession.setAttribute("loginStatus",true);
                    System.out.println("1");
                    httpSession.setAttribute("registerVerification", RegisterCode.NON_REGISTER);
//                    httpSession.setAttribute("verificationCode", RegisterCode.LOGIN_FAILED);
                    req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
                    return;
                }
            }
        }
        System.out.println("2");
        httpSession.setAttribute("loginStatus",false);
        httpSession.setAttribute("registerVerification", RegisterCode.LOGIN_FAILED);
        req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);

    }
}
