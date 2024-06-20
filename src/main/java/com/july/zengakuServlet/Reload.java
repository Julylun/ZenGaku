package com.july.zengakuServlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet(name = "reload", value = "/reload")
public class Reload extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("RELOAD");
        HttpSession httpSession = req.getSession();
        System.out.println("[RELOAD-SESSION]: " + httpSession.getAttribute("loginStatus"));
        req.getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }
}
