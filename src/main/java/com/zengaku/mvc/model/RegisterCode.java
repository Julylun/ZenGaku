package com.zengaku.mvc.model;

public class RegisterCode {
    public static int NON_REGISTER = 0; //Default
    public static int REGISTERED = 1; //Display verification form
    public static int VERIFICATED = 2; //display information form
    public static int CREATED = 3; //display success form

    public static int FORGET_STATUS_SENT_EMAIL = 300; //display sent form
    public static int CHANGED_PASSWORD = 400; //display changed password form
    public static int LOGIN_FAILED = -101; //Display a failed login notify

    public static String toString(int number) {
        return ""+number;
    }
}
