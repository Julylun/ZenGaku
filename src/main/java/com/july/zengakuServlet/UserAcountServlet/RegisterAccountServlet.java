package com.july.zengakuServlet.UserAcountServlet;

import com.zengaku.mvc.controller.EmailFactory;
import com.zengaku.mvc.controller.LanguageFilter;
import com.zengaku.mvc.controller.SecureFactory;
import com.zengaku.mvc.model.PrintColor;
import com.zengaku.mvc.model.RegisterCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;

//@WebServlet(name = "register", value = "/register_account")

/**
 * RegisterAccountServlet is an API using for register new ZenGaku account;
 * there are some return error in this servlet:
 *    -> 401: client send a wrong password (password and repeat password is not correct
 *    -> 408: error at email sending => check connection or email
 *    -> 408: unknown
 */
@WebServlet(value = "/register_account")
@MultipartConfig
public class RegisterAccountServlet extends HttpServlet {
    public final static int WRONG_PASSWORD = 401;
    public final static int TIMEOUT = 408;
    public final static int UNDETECTABLE = 408;
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
//        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        try{
//            resp.getWriter().write("UMG");
            System.out.println(PrintColor.YELLOW + "[RegisterAccountServlet]<doPost>: An user is creating account" + PrintColor.RESET);
            System.out.println(PrintColor.YELLOW + "[RegisterAccountServlet]<doPost>: HIII" + PrintColor.RESET);
            String userName = req.getParameter("userName");
            String userPassword = req.getParameter("userPassword");
            String repeatUserPassword = req.getParameter("repeatUserPassword");
            System.out.println(PrintColor.YELLOW + "[RegisterAccountServlet]<doPost>: " + userName + " - " + userPassword + "-" + repeatUserPassword + PrintColor.RESET);
            String userEmail = req.getParameter("userEmail");

            HttpSession httpSession = req.getSession();

            if(userPassword.equals(repeatUserPassword)){

                httpSession.setAttribute("userName",userName);
                httpSession.setAttribute("userPassword", SecureFactory.encode(userPassword));
                httpSession.setAttribute("userEmail",userEmail);
                httpSession.setAttribute("registerVerification", RegisterCode.REGISTERED);
                int verificationCode = (int)Math.floor(Math.random() * (999999 - 111111 + 1) + 100000);
                httpSession.setAttribute("verificationCode", verificationCode);

//                req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
                EmailFactory.sendMail(userEmail,userName,verificationCode);
                System.out.println(httpSession.getAttribute("registerVerification"));
                System.out.println(PrintColor.GREEN + "Time -> " + LocalDateTime.now() + PrintColor.RESET);
                System.out.println(PrintColor.YELLOW + "[RegisterAccountServlet]<doPost>: OKAY" + PrintColor.RESET);
                out.write("{\"approve\":\"true\"}");
                return;
            }
            httpSession.setAttribute("registerVerification", (int)0);
            out.write("{\"approve\":\"false\", \"error\":\""+ WRONG_PASSWORD +"\"}");

        } catch (RuntimeException rte) {
            rte.printStackTrace();
            out.write("{\"approve\":\"false\"}, \"error\":\"" + TIMEOUT + "\"}");
        }
        catch (Exception e) {
            e.printStackTrace();
            out.write("{\"approve\":\"false\", \"error\":\"" + UNDETECTABLE + "\"}");
        }
    }
}
