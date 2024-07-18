package com.july.zengakuServlet.UserAcountServlet;

import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.HTTP.ErrorCode;
import com.zengaku.mvc.model.PrintColor;
import com.zengaku.mvc.model.RegisterCode;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Locale;

@WebServlet(name = "information_creation", value = "/information_creation")
@MultipartConfig
public class InformationCreation extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Session databaseSession = HibernateUtils.getSessionFactory().openSession();
            HttpSession httpSession = req.getSession();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

            //Below throw a DateTimeParseException, this is normally
            LocalDate userBirthday = LocalDate.parse(req.getParameter("userBirthday"));

            System.out.println("[InformationCreation]<doPost>: localDate usbday -> " + userBirthday);
            System.out.println("[InformationCreation]<doPost>: bday -> " + req.getParameter("userBirthday")
                + " - first + last ->" + req.getParameter("userFirstName") + " " + req.getParameter("userLastName"));
            User user = new User();
            user.setUserName(httpSession.getAttribute("userName").toString());
            user.setUserPassword(httpSession.getAttribute("userPassword").toString());
            user.setUserEmail(httpSession.getAttribute("userEmail").toString());
            user.setUserFirstName(req.getParameter("userFirstName"));
            user.setUserLastName(req.getParameter("userLastName"));
            user.setUserBirthday(userBirthday);
            System.out.println(PrintColor.GREEN + "[InformationCreation]>" +
                    "Created user object -> username: " + user.getUserName() + PrintColor.RESET);

            databaseSession.save(user);
            databaseSession.close();
            httpSession.setAttribute("registerVerification", RegisterCode.CREATED);


            resp.getWriter().write("{\"approve\":\"true\",\"error\":\""+ ErrorCode.OKAY + "\"}");
        }
        catch (Exception e) {
            resp.getWriter().write("{\"approve\":\"false\",\"error\":\"" + ErrorCode.INTERNAL_SERVER_ERROR + "\"}");
            e.printStackTrace();
        }

//        req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
    }
}
