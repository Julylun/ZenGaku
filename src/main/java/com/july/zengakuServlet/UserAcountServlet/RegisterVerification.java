package com.july.zengakuServlet.UserAcountServlet;

import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.HTTP.ErrorCode;
import com.zengaku.mvc.model.PrintColor;
import com.zengaku.mvc.model.RegisterCode;
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

@WebServlet(name = "RegisterVerification", value = "/register_verification")
@MultipartConfig
public class RegisterVerification extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession httpSession = req.getSession();
        if(httpSession.getAttribute("registerVerification").toString()
                .equals(RegisterCode.toString(RegisterCode.NON_REGISTER))){
            resp.getWriter().write("{\"approve\":\"false\",\"error\":\""+ ErrorCode.UNAUTHORIZED +"\"}");
//            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
            return;
        }

        System.out.println(PrintColor.GREEN + "Time -> " + LocalDateTime.now() + PrintColor.RESET);
        System.out.println(httpSession.getAttribute("verificationCode").toString());
        System.out.println(req.getParameter("verificationCode"));
        if((httpSession.getAttribute("verificationCode").toString()).equals(req.getParameter("verificationCode"))){
            httpSession.setAttribute("registerVerification", RegisterCode.VERIFICATED);
            //Return okay
            resp.getWriter().write("{\"approve\":\"true\",\"error\":\""+ ErrorCode.OKAY +"\"}");
            Session databaseSession = HibernateUtils.getSessionFactory().openSession();
            if(!databaseSession.isConnected()){
                resp.getWriter().write("{\"approve\":\"false\",\"error\":\""+ ErrorCode.SERVICE_UNAVAILABLE +"\"}");
//                req.getServletContext().getRequestDispatcher("/Error401.jsp").forward(req,resp);
            }
//            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
        }
        else {
            resp.getWriter().write("{\"approve\":\"false\",\"error\":\""+ ErrorCode.NOT_ACCEPTABLE +"\"}");
//            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
        }
    }

   @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

//        super.doGet(req, resp);
    }
}
