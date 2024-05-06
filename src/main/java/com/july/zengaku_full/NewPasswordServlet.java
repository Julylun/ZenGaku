package com.july.zengaku_full;

import com.zengaku.mvc.controller.HashFactory;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.controller.SecureFactory;
import com.zengaku.mvc.model.PasswordResetToken;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.query.Query;


import java.io.IOException;
import java.util.List;

@WebServlet(name = "New-Password", urlPatterns = {"/new-password"})
public class NewPasswordServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getServletContext().getRequestDispatcher("/PasswordReset.jsp").forward(req, resp);
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();

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
                    // update user password ( storedTokenObject.getUser())
                    User user = storedTokenObject.getUser();
                    user.setUserPassword(HashFactory.encode(newPassword));
                    databaseSession.update(user);

                    storedTokenObject.setUsed(true);
                    databaseSession.update(storedTokenObject);

                    databaseSession.close();
                    System.out.println("Update password successfully");
                }


            }
        }


    }
}
