package com.zengaku.mvc.controller.Exception;

public class IncorrectProfileException extends Exception{
    public IncorrectProfileException(String errorMessage) {
        super(errorMessage);
    }
}
