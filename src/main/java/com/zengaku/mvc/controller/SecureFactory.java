package com.zengaku.mvc.controller;

import com.google.common.hash.Hashing;
import com.zengaku.mvc.model.PasswordResetToken;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

public class SecureFactory {
    private static final SecureRandom secureRandom = new SecureRandom();
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder();

    public static String encode(String password) {
        return Hashing.sha256()
                .hashString(password, StandardCharsets.UTF_8)
                .toString();
    }

    // generate and validate password reset token
    public static String generateToken() {
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }

    public static boolean validateToken(PasswordResetToken storedToken) {
        if (storedToken.isExpired() || storedToken.isUsed()) {
            System.out.println("Token is not valid or expired");
            return false;
        }
        return true;
    }
}
