package com.july.zengaku_full;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "Password-Reset", value = "/password-reset")
public class PasswordResetServlet extends HttpServlet{
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String userEmail = req.getParameter("userEmail");


      // user found ? :  create password reset token , store in database , and send it to userEmail
       // zengaku.com/password-change?token=<Token here>
        // when user submitted , validate with the token stored in db, and update user password


    }
}
