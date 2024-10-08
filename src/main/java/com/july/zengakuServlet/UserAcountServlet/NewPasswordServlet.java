package com.july.zengakuServlet.UserAcountServlet;

import com.zengaku.mvc.controller.HashFactory;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.controller.SecureFactory;
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
import org.hibernate.Transaction;
import org.hibernate.query.Query;


import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.List;

@WebServlet(name = "New-Password", urlPatterns = {"/new-password"})
public class NewPasswordServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getServletContext().getRequestDispatcher("/PasswordReset.jsp").forward(req, resp);
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        PrintWriter out = resp.getWriter();

        String candidateToken = req.getParameter("token");
        String newPassword = req.getParameter("newPassword");

        if (candidateToken != null) {

            String hql = "FROM PasswordResetToken p Where p.token = :token";
            Query query = databaseSession.createQuery(hql, PasswordResetToken.class);
            query.setParameter("token", candidateToken);
            List<PasswordResetToken> tokenList = query.getResultList();

            if (tokenList.size() != 0) {
                PasswordResetToken storedTokenObject = tokenList.get(0);
                if (SecureFactory.validateToken(storedTokenObject)) {
                    HttpSession session = req.getSession();
                    Transaction transaction = databaseSession.beginTransaction();

                    User user = storedTokenObject.getUser();
                    user.setUserPassword(HashFactory.encode(newPassword));

                    databaseSession.update(user);

                    storedTokenObject.setUsed(true);
                    databaseSession.update(storedTokenObject);

                    transaction.commit();

                    session.setAttribute("registerVerification", RegisterCode.CHANGED_PASSWORD);
                    req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);

                    System.out.println(PrintColor.GREEN + "Time -> " + LocalDateTime.now() + PrintColor.RESET);
                    System.out.println(PrintColor.GREEN + "[NewPasswordServlet]> "
                            + req.getRemoteAddr() + ":\tUpdate password successfully" + PrintColor.RESET);
                }

            }
        }

        System.out.println(PrintColor.RED + "[NewPasswordServlet]> "
                + req.getRemoteAddr() + ":\tUpdate password failed" + PrintColor.RESET);


    }
}
