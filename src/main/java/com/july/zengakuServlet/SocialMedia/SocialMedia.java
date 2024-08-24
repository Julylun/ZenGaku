package com.july.zengakuServlet.SocialMedia;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet("/Zentizen")
public class SocialMedia extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(req.getSession().getAttribute("loginStatus"));
        boolean loginStatus = req.getSession().getAttribute("loginStatus") != null && (boolean) req.getSession().getAttribute("loginStatus");
        if(loginStatus){
            req.getRequestDispatcher("/laicos.jsp").forward(req,resp);
        } else {
            req.getRequestDispatcher("401").forward(req,resp);
        }
    }
}
