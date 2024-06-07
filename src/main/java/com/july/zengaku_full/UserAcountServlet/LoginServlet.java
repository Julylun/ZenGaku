package com.july.zengaku_full.UserAcountServlet;
import com.zengaku.mvc.model.PrintColor;
import org.apache.commons.codec.binary.Base64;

import com.google.gson.Gson;
import com.zengaku.mvc.controller.EmailFactory;
import com.zengaku.mvc.controller.SecureFactory;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.AuthToken;
import com.zengaku.mvc.model.RegisterCode;
import com.zengaku.mvc.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.glassfish.jaxb.runtime.v2.runtime.unmarshaller.Base64Data;
import org.glassfish.jaxb.runtime.v2.runtime.unmarshaller.StructureLoader;
import org.hibernate.Session;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.swing.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

import java.util.Date;
import java.util.List;
import java.util.Scanner;

@WebServlet(name = "login", value = "/login")
public class LoginServlet extends HttpServlet {
    private final String SI_CO_RET_KI = "HOANGLUANHONGHAINGUYENVYDUYENLANHHOANGLUANHONGHAINGUYENVYDUYENLANH";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            JsonReader jsonReader = Json.createReader(req.getInputStream());
            JsonObject jsonObject = jsonReader.readObject();
            String accessToken = jsonObject.getString("authToken");
            String[] splitToken = accessToken.split("\\.");
            String headerEncoding = splitToken[0];
            Base64 base64 = new Base64();
            String header = new String(base64.decode(headerEncoding.getBytes(StandardCharsets.UTF_8)));
            String body = new String(splitToken[1].getBytes(StandardCharsets.UTF_8));
            System.out.println(header + "\n---\n" + body);

        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            JsonReader jsonReader = Json.createReader(req.getInputStream());
            JsonObject jsonObject = jsonReader.readObject();
            String userName = jsonObject.getString("userName");
            String userPassword = jsonObject.getString("userPassword");
            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setContentType("application/json");
            PrintWriter out = resp.getWriter();
            Session databaseSession = HibernateUtils.getSessionFactory().openSession();
            List<User> userList = databaseSession.createQuery("FROM User").list();

            HttpSession httpSession = req.getSession();

            for (User user : userList) {
                if (user.getUserName().equals(userName)) {
                    if (user.getUserPassword().equals(SecureFactory.encode(userPassword))) {
                        String jwtToken = Jwts.builder()
                                .setSubject(user.getId().toString())
                                .setIssuedAt(new Date())
                                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                                .signWith(SignatureAlgorithm.HS256, SI_CO_RET_KI)
                                .compact();
                        AuthToken authToken = new AuthToken();
                        authToken.setUser(user);
                        authToken.setAccessToken(jwtToken);
                        databaseSession.save(authToken);
                        databaseSession.close();

                        httpSession.setAttribute("loginStatus", true);
                        httpSession.setAttribute("registerVerification", RegisterCode.NON_REGISTER);
                        out.print("{\"token\":\"" + jwtToken + "\"}");
                        out.flush();
                        System.out.println(PrintColor.GREEN_BOLD_BRIGHT + "[LoginServlet]> " + req.getRemoteAddr() + ":\tLogin Successfully!" + PrintColor.RESET);
                        System.out.println(PrintColor.GREEN_BOLD_BRIGHT + "[LoginServlet]> " +
                                "(-*-) Ip Address: " + req.getRemoteAddr() + " - Local Address: " + req.getLocalAddr() + "\n" + PrintColor.GREEN +
                                "(-*-) User Id: " + user.getId() + "\n" +
                                "(-*-)User name: " + userName + "\n" +
                                "(-*-) User full name: " + user.getUserFirstName() + " " + user.getUserLastName() + PrintColor.RESET);

                        return;
                    }
                }
            }
            System.out.println(PrintColor.RED + "[LoginServlet]> " + req.getRemoteAddr() + ":\tLogin failed!" + PrintColor.RESET);
            httpSession.setAttribute("loginStatus", false);
            httpSession.setAttribute("registerVerification", RegisterCode.LOGIN_FAILED);
            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
