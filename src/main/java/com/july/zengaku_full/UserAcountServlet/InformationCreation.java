package com.july.zengaku_full.UserAcountServlet;

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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.Locale;
import java.util.logging.SimpleFormatter;

@WebServlet(name = "information_creation", value = "/information_creation")
public class InformationCreation extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        HttpSession httpSession = req.getSession();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
//            Date date = formatter.parse(req.getParameter("userBirthday"));
        LocalDate userBirthday = LocalDate.parse(req.getParameter("userBirthday"));
//            System.out.println(date);
//            java.sql.Date userBirthday =  new java.sql.Date(date.getYear(),date.getMonth(),date.getDay());

        User user = new User();
        user.setUserName(httpSession.getAttribute("userName").toString());
        user.setUserPassword(httpSession.getAttribute("userPassword").toString());
        user.setUserEmail(httpSession.getAttribute("userEmail").toString());
        user.setUserFirstName(req.getParameter("userFirstName"));
        user.setUserLastName(req.getParameter("userLastName"));
        user.setUserBirthday(userBirthday);

        databaseSession.save(user);
        databaseSession.close();
        httpSession.setAttribute("registerVerification", RegisterCode.CREATED);
        req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
    }
}
