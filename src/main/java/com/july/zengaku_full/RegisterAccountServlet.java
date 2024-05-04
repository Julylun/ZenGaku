package com.july.zengaku_full;

import com.zengaku.mvc.controller.EmailFactory;
import com.zengaku.mvc.controller.SecureFactory;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "register", value = "/register_account")
public class RegisterAccountServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String userName = req.getParameter("userName");
        String userPassword = req.getParameter("userPassword");
        String repeatUserPassword = req.getParameter("repeatUserPassword");
        String userEmail = req.getParameter("userEmail");
        PrintWriter out = resp.getWriter();
        HttpSession httpSession = req.getSession();

        if(userPassword.equals(repeatUserPassword)){

            httpSession.setAttribute("userName",userName);
            httpSession.setAttribute("userPassword", SecureFactory.encode(userPassword));
            httpSession.setAttribute("userEmail",userEmail);
            httpSession.setAttribute("registerVerification", (int)1);
            int verificationCode = (int)Math.floor(Math.random() * (999999 - 111111 + 1) + 100000);
            httpSession.setAttribute("verificationCode", verificationCode);
            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
            EmailFactory.sendMail(userEmail,userName,verificationCode);
            System.out.println(httpSession.getAttribute("registerVerificationz"));
            return;

        }
        httpSession.setAttribute("registerVerification", (int)0);
        out.println("Register failed");

    }
}
