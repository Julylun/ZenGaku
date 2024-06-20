package com.zengaku.mvc.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zengaku.mvc.model.AuthToken;
import com.zengaku.mvc.model.PrintColor;
import com.zengaku.mvc.model.RefreshToken;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.Session;

import java.io.IOException;
import java.util.Enumeration;

@MultipartConfig
@WebServlet("/api/getAccessToken")
public class AccessTokenAPI extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try{
            System.out.println(PrintColor.YELLOW_BOLD_BRIGHT + "[" + req.getRemoteAddr() + "]<AccessTokenAPI>: Request get new AccessToken" + PrintColor.RESET);
            System.out.println(PrintColor.YELLOW + "[" + req.getRemoteAddr() + "]<AccessTokenAPI>: Getting refresh token..." + PrintColor.RESET);

            String refreshToken = req.getParameter("refreshToken");
            Long userId;
            if(!refreshToken.equals("null")){
                System.out.println(refreshToken);
                userId = TokenUtils.getIdByJWT(refreshToken);
            }
            else userId = (long) -1;

            System.out.println(PrintColor.YELLOW + "[" + req.getRemoteAddr() + "]<AccessTokenAPI>: Refresh token -> " + refreshToken + "\n\tChecking token expired..." + PrintColor.RESET);
            if(userId == -1 || RefreshToken.isExpried(userId)){
                System.out.println(PrintColor.RED + "[" + req.getRemoteAddr() + "]<AccessTokenAPI>: Refresh is expired!" + PrintColor.RESET);
                System.out.println(PrintColor.YELLOW_BOLD_BRIGHT + "[" + req.getRemoteAddr() + "]<AccessTokenAPI>: End request" + PrintColor.RESET);
                req.getSession().setAttribute("loginStatus", false);
                resp.getWriter().write("{\"AccessJWT\":\"\"}");
                return;
            }
            System.out.println(PrintColor.YELLOW + "[" + req.getRemoteAddr() + "]<AccessTokenAPI>: Refresh token is available" + PrintColor.RESET);
            Session session = HibernateUtils.getSessionFactory().openSession();
            User user = User.getUserById(userId);
            System.out.println(PrintColor.YELLOW + "[" + req.getRemoteAddr() + "]<AccessTokenAPI>: Creating access token..." + PrintColor.RESET);
            String accessJWT = TokenUtils.createJWT(user,AuthToken.EXPIRED_TIME);
            AuthToken authToken = new AuthToken(user,accessJWT);
            session.save(authToken);
            session.close();
            System.out.println(PrintColor.GREEN + "[" + req.getRemoteAddr() + "]<AccessTokenAPI>: Access token -> " + accessJWT + PrintColor.RESET);

            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            ObjectNode rootNode = mapper.createObjectNode();
            rootNode.put("AccessJWT",accessJWT);

            System.out.println(PrintColor.YELLOW + "[" + req.getRemoteAddr() + "]<AccessTokenAPI>: Sending access token to client..." + PrintColor.RESET);

            String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(rootNode);
            resp.getWriter().write(json);
        }catch (Exception e){
            e.printStackTrace();
        }
        System.out.println(PrintColor.YELLOW_BOLD_BRIGHT + "[" + req.getRemoteAddr() + "]<AccessTokenAPI>: End request" + PrintColor.RESET);
    }
}
