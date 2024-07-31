package com.july.zengakuServlet;

import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.PrintColor;
import com.zengaku.mvc.model.RegisterCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;

import java.io.IOException;
import java.time.LocalDateTime;

@WebServlet(name = "Home", value = (""))
public class HomeServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HibernateUtils.getSessionFactory().openSession();
        HttpSession userSession =  req.getSession();

        System.out.println(PrintColor.GREEN_BOLD_BRIGHT + "--HomeServlet--\n" + "A device connected");
        System.out.println(PrintColor.GREEN + "Time " + LocalDateTime.now() + PrintColor.RESET);
        System.out.println("IP Address:\t" + req.getRemoteAddr() +"\nLocal Address:\t" + req.getLocalAddr()
                + "\n---------------" + PrintColor.RESET);
//
        userSession.setAttribute("registerVerification", RegisterCode.NON_REGISTER);
//        userSession.setAttribute("loginStatus",false);
        System.out.println(PrintColor.GREEN + "[HomeServlet]>" +
                req.getRemoteAddr() + ":\tSet Register status session -> false\n"+
        "\t set Login status session -> doesn't set\n" +
                "Forward " + req.getRemoteAddr() + " to index.jsp" +PrintColor.RESET);

        req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doPost(req, resp);
    }
}
