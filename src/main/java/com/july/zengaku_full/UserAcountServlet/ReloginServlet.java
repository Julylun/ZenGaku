package com.july.zengaku_full.UserAcountServlet;

import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.controller.SecureFactory;
import com.zengaku.mvc.model.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.json.stream.JsonParser;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.apache.commons.codec.binary.Base64;
import org.hibernate.Session;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

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
import org.hibernate.query.Query;
import org.json.JSONObject;

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
                httpSession.setAttribute("loginStatus", true);
                httpSession.setAttribute("registerVerification", RegisterCode.NON_REGISTER);

                //Debug - delete in final version
                System.out.println(PrintColor.GREEN + "[ReloginServlet]>"
                        + req.getRemoteAddr() + ": Token is available, the server is sending a approve to the client."
                        + PrintColor.RESET);
                //---


                out.println("{\"isApprove\":\""+ "true" + "\"}");
                out.flush();
                return;
            } else {
                //Debug - delete in final version
                System.out.println(PrintColor.YELLOW + "[ReloginServlet]>"
                        + req.getRemoteAddr() + ": Token is expired or unavailable, the server is sending a deny to the client.");
                //---

                out.println("{\"isApprove\":\"\"}" + PrintColor.RESET);
                out.flush();
            }

        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}

