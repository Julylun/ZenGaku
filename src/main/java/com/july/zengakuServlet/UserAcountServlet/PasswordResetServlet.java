package com.july.zengakuServlet.UserAcountServlet;

import com.zengaku.mvc.controller.EmailFactory;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.PasswordResetToken;
import com.zengaku.mvc.model.PrintColor;
import com.zengaku.mvc.model.RegisterCode;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;
import org.hibernate.query.Query;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.List;

import com.zengaku.mvc.controller.SecureFactory;

//NEED FIX -> Change static link at line 54 into dynamic link

@WebServlet(name = "Password-Reset", urlPatterns = {"/recover"})
public class PasswordResetServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        HttpSession session = req.getSession();

        PrintWriter out = resp.getWriter();

        String userEmail = req.getParameter("userRecoveryEmail");


        String hql = "FROM User u Where u.userEmail = :email";
        Query query = databaseSession.createQuery(hql, User.class);
        query.setParameter("email", userEmail);
        List<User> userList = query.getResultList();


        if (userList.size() != 0) {
            session.setAttribute("userRecoveryEmail",userEmail);
            User user = userList.get(0);

            PasswordResetToken PRToken = new PasswordResetToken(SecureFactory.generateToken(), user);

            databaseSession.save(PRToken);

            databaseSession.close();
            String resetLink = "http://localhost:8080/ZenGaku_Full_war/new-password?token=" + PRToken.getToken();
            EmailFactory.sendRecoveryMail(userEmail, resetLink);

            session.setAttribute("registerVerification", RegisterCode.FORGET_STATUS_SENT_EMAIL);
            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
            System.out.println(PrintColor.GREEN + "Time -> " + LocalDateTime.now() + PrintColor.RESET);
            System.out.println(PrintColor.GREEN + "[PasswordResetServlet]> "
                    + req.getRemoteAddr() + ":\tSent to email to" + userEmail);
            out.println("sent to email");

        }
        // user found ? :  create password reset token , store in database , and send it to userEmail
        // zengaku.com/new-password?token=<Token here>
        // when user submitted , validate with the token stored in db, and update user password


    }
}
