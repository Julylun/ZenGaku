package com.july.zengakuServlet.UserAcountServlet;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zengaku.mvc.controller.TokenUtils;
import com.zengaku.mvc.model.*;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.*;
import org.apache.commons.codec.binary.Base64;

import com.zengaku.mvc.controller.SecureFactory;
import com.zengaku.mvc.controller.HibernateUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import org.hibernate.Session;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

import java.util.List;

@WebServlet(name = "login", value = "/login")
@MultipartConfig
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
//            JsonReader jsonReader = Json.createReader(req.getInputStream());
//            JsonObject jsonObject = jsonReader.readObject();
//            String userName = jsonObject.getString("userName");
//            String userPassword = jsonObject.getString("userPassword");
            String userName = req.getParameter("userName");
            String userPassword = req.getParameter("userPassword");
            System.out.println("[LoginServlet]<doPost> username: " + userName + " - userpassword: " + userPassword);

            resp.setHeader("Access-Control-Allow-Origin", "*");
            resp.setContentType("application/json");
            PrintWriter out = resp.getWriter();
            Session databaseSession = HibernateUtils.getSessionFactory().openSession();
            List<User> userList = databaseSession.createQuery("FROM User").list();

            HttpSession httpSession = req.getSession();

            for (User user : userList) {
                if (user.getUserName().equals(userName)) {
                    if (user.getUserPassword().equals(SecureFactory.encode(userPassword))) {
                        String json;
                        ObjectMapper mapper = new ObjectMapper();
                        mapper.registerModule(new JavaTimeModule());
                        ObjectNode rootNode = mapper.createObjectNode();

                        String accessToken = TokenUtils.createJWT(user,AuthToken.EXPIRED_TIME);
                        AuthToken authToken = new AuthToken(user,accessToken);
                        rootNode.put("accessJWT",accessToken);

                        databaseSession.save(authToken);

                        String refreshTokenJWT;
                        if(RefreshToken.isExpired(user)){
                            refreshTokenJWT = TokenUtils.createJWT(user,RefreshToken.EXPIRED_TIME);
                            RefreshToken refreshToken = new RefreshToken(user,refreshTokenJWT);
                            databaseSession.save(refreshToken);

                        } else {
                            refreshTokenJWT = RefreshToken.getRefreshTokenByUser(user);
                        }
                        rootNode.put("refreshJWT",refreshTokenJWT);

                        rootNode.put("userId",user.getId());
                        rootNode.put("firstName",user.getUserFirstName());
                        rootNode.put("lastName",user.getUserLastName());
                        rootNode.put("avtHref", user.getUserAvatar());

                        databaseSession.close();

                        httpSession.setAttribute("isSkipHome",true);
                        httpSession.setAttribute("loginStatus", true);
                        httpSession.setAttribute("registerVerification", RegisterCode.NON_REGISTER);


                        Cookie cookie = new Cookie("JSESSIONID", httpSession.getId());
                        cookie.setPath("/"); // Đặt đường dẫn của cookie để áp dụng cho toàn bộ tên miền
                        resp.addCookie(cookie);



                        json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(rootNode);
                        System.out.println(json);
                        out.print(json);
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
            httpSession.setAttribute("isSkipHome",false);
            httpSession.setAttribute("registerVerification", RegisterCode.LOGIN_FAILED);
            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
