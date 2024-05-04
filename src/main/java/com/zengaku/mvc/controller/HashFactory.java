package com.zengaku.mvc.controller;

import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;

public class HashFactory {
    public static String encode(String password){
        return Hashing.sha256()
                .hashString(password, StandardCharsets.UTF_8)
                .toString();
    }
}
