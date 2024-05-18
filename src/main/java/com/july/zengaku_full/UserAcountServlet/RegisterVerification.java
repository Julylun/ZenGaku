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

@WebServlet(name = "RegisterVerification", value = "/register_verification")
public class RegisterVerification extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession httpSession = req.getSession();
        if(httpSession.getAttribute("registerVerification").toString()
                .equals(
                        RegisterCode.toString(RegisterCode.NON_REGISTER))
                        ){
            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
            return;
        }
        System.out.println(httpSession.getAttribute("verificationCode").toString());
        System.out.println(req.getParameter("verificationCode"));
        if((httpSession.getAttribute("verificationCode").toString()).equals(req.getParameter("verificationCode"))){
            httpSession.setAttribute("registerVerification", RegisterCode.VERIFICATED);
            Session databaseSession = HibernateUtils.getSessionFactory().openSession();
            if(!databaseSession.isConnected()){
                req.getServletContext().getRequestDispatcher("/Error401.jsp").forward(req,resp);
            }
            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
        }
        else {
            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
        }
    }

   @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

//        super.doGet(req, resp);
    }
}
