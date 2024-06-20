package com.july.zengakuServlet.UserAcountServlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zengaku.mvc.model.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import java.io.IOException;
import java.io.PrintWriter;

import com.zengaku.mvc.model.AuthToken;
import com.zengaku.mvc.model.RegisterCode;
import com.zengaku.mvc.model.User;


@WebServlet(name = "relogin", value = "/relogin")
public class ReloginServlet extends HttpServlet {
    private final String SI_CO_RET_KI = "HOANGLUANHONGHAINGUYENVYDUYENLANHHOANGLUANHONGHAINGUYENVYDUYENLANH";

    /**
     * Read json file from client then use get userId to find
     * Json Web Token and use this to check that is it expired
     * if this token is not expired, set loginStatus in session
     * to true and return client a json file containing approve value.
     * Reverse, set loginStatus to false and send a rejection to client.
     *
     * @author Hoang Luan
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            JsonReader jsonReader = Json.createReader(req.getInputStream());
            JsonObject jsonObject = jsonReader.readObject();
            String accessToken = jsonObject.getString("authToken");

//          Parse token into many parts, take userId from them and find all authToken of that userId then
//            Check is accessToken expired
            System.out.println("Access token: " + accessToken);

            //new code
            PrintWriter out = resp.getWriter();
            if(AuthToken.isExpired(accessToken)){
                HttpSession httpSession = req.getSession();
                httpSession.setAttribute("isSkipHome", true);
                httpSession.setAttribute("loginStatus", true);
                httpSession.setAttribute("registerVerification", RegisterCode.NON_REGISTER);

                //Debug - delete in final version
                System.out.println(PrintColor.GREEN + "[ReloginServlet]>"
                        + req.getRemoteAddr() + ": Token is available, the server is sending a approve to the client."
                        + PrintColor.RESET);
                //---


                User user = AuthToken.getUserByAccessToken(accessToken);

                String json;
                ObjectMapper mapper = new ObjectMapper();
                mapper.registerModule(new JavaTimeModule());
                ObjectNode rootNode = mapper.createObjectNode();
                rootNode.put("isApprove","true");
                rootNode.put("userId",user.getId());
                rootNode.put("firstName",user.getUserFirstName());
                rootNode.put("lastName",user.getUserLastName());
                rootNode.put("avtHref", user.getUserAvatar());
                System.out.println("TEST RELOGIN: userid = " + user.getId());
//                rootNode.put("userid",user.getId());

//                out.println("{\"isApprove\":\""+ "true" + "\"}");
                json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(rootNode);
//                System.out.println(json);
                out.print(json);
                out.flush();
                return;
            } else {
                //Debug - delete in final version
                System.out.println(PrintColor.YELLOW + "[ReloginServlet]>"
                        + req.getRemoteAddr() + ": Token is expired or unavailable, the server is sending a deny to the client.");
                //---

                req.getSession().setAttribute("loginStatus", false);
                System.out.println("{\"isApprove\":\"false\"}" + PrintColor.RESET);
                out.println("{\"isApprove\":\"false\"}");
                out.flush();
            }

        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}

