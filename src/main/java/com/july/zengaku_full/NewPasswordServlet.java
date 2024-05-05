package com.july.zengaku_full;


import com.zengaku.mvc.controller.HibernateUtils;

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

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();

        String candidateToken = req.getParameter("token");
        if(candidateToken!=null){

            String hql = "FROM PasswordResetToken p Where p.token = :token";
            Query query = databaseSession.createQuery(hql, PasswordResetToken.class);
            query.setParameter("token", candidateToken);
            List<PasswordResetToken> tokenList = query.getResultList();
            PasswordResetToken storedTokenObject = tokenList.get(0);

            if(candidateToken.equals(storedTokenObject.getToken())){
                // update user password ( storedTokenObject.getUser())
                System.out.println("Update password successfully");
            }
        }






    }
}
