package com.zengaku.mvc.model;

public class RegisterCode {
    public static int NON_REGISTER = 0;
    public static int REGISTERED = 1;
    public static int VERIFICATED = 2;
    public static int FORGET_STATUS_SENT_EMAIL = 300;
    public static int CHANGED_PASSWORD = 400;

    public static String toString(int number) {
        return ""+number;
    }
}
