package com.zengaku.mvc.controller;

import com.zengaku.mvc.model.AuthToken;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import org.hibernate.Session;

import java.security.Signature;

public class TokenUtils {
    public static String createJWT(String id, String issuer, String subject, long timeMillis) {
        JsonObject jsonObject = JsonObject.EMPTY_JSON_OBJECT;

        String signature = "";
        return "";
    }
}
