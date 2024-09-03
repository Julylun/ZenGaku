package com.zengaku.mvc.controller.Exception.Token;

public class ExpiredTokenException extends Exception{
    public ExpiredTokenException(String msg) {
        super(msg);
    }
}
