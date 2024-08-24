package com.zengaku.mvc.controller;

import com.zengaku.mvc.model.AuthToken;
import com.zengaku.mvc.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import org.apache.commons.codec.binary.Base64;
import org.hibernate.Session;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.security.Signature;
import java.util.Date;

public class TokenUtils {
    private static final String SI_CO_RET_KI = "HOANGLUANHONGHAINGUYENVYDUYENLANHHOANGLUANHONGHAINGUYENVYDUYENLANH";
    public static String createJWT(User user, long timeMillis) {
        String jwtToken = Jwts.builder()
                .setSubject(user.getId().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + timeMillis))
                .signWith(SignatureAlgorithm.HS256, SI_CO_RET_KI)
                .compact();

        return jwtToken;
    }

    /**
     * return userId or -1 if jwt is not available.
     * @param JWT
     * @return
     */
    public static long getIdByJWT(String JWT){
        try{
            System.out.println("TOKEN DEBUGGUG: " + JWT);
            String splitToken = JWT.split("\\.")[1];
            Base64 base64 = new Base64();
            String body = new String(base64.decode(splitToken.getBytes(StandardCharsets.UTF_8)));
            JSONObject readJson = new JSONObject(body);
            Long userId = Long.valueOf(readJson.getInt("sub"));
            return userId;
        } catch (Exception e) {
            return -1;
        }

    }
}
