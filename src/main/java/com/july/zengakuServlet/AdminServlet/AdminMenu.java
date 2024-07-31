package com.july.zengakuServlet.AdminServlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/admin/menu")
public class AdminMenu extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if(req.getSession().getAttribute("adminAuth") == "true")
            req.getRequestDispatcher("/ManagePage/menu.jsp").forward(req, resp);
        else resp.sendError(401);
    }
}
