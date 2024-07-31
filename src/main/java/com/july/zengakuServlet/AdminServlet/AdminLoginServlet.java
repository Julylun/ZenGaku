package com.july.zengakuServlet.AdminServlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;

import java.io.IOException;
import java.time.LocalDateTime;

@WebServlet("/admin/login")
@MultipartConfig
public class AdminLoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/ManagePage/login.jsp").forward(req, resp);
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String inputName = req.getParameter("username");
        String inputPassword = req.getParameter("password");
        System.out.println("[AdminLoginServlet]<doPost>:-x-x-x-x-x ADMIN LOGIN -x-x-x-x-x-");
        System.out.println("[AdminLoginServlet]<doPost>: time -> " + LocalDateTime.now());
        System.out.println("[AdminLoginServlet]<doPost>: ip -> " + req.getRemoteAddr());
        System.out.println("[AdminLoginServlet]<doPost>: username -> " + inputName);
        System.out.println("[AdminLoginServlet]<doPost>: password -> " + inputPassword);
        HttpSession session = req.getSession();
        if(!(inputName.equals(AdminConstant.ADMIN_NAME) && inputPassword.equals(AdminConstant.ADMIN_PASSWORD))){

            if(session.getAttribute("tryTime") == null) {
                session.setAttribute("tryTime",1);
            } else {
//            session.setAttribute("tryTime",Integer.parseInt((String) session.getAttribute("tryTime"))+1);
            }
            session.setAttribute("adminAuth","false");
            resp.getWriter().write("{\"approve\":\"false\",\"tryTime\":\"0\"}");
        } else {
            session.setAttribute("adminAuth","true");
            resp.getWriter().write("{\"approve\":\"true\",\"tryTime\":\"0\"}");
        }
    }
}
