package com.july.zengaku_full;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.glassfish.jaxb.core.util.Which;

import java.io.IOException;
import java.util.Enumeration;

@WebServlet(name = "return_home", value = "/return-normal-page")
public class ReturnHomeServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession httpSession = req.getSession();
        Enumeration<String> attrName = httpSession.getAttributeNames();
        while (attrName.hasMoreElements()){
            httpSession.removeAttribute(attrName.nextElement());
        }
        req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);

    }
}
