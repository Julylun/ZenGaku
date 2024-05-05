package com.zengaku.mvc.model;

public class RegisterCode {
    public static int NON_REGISTER = 0;
    public static int REGISTERED = 1;
    public static int VERIFICATED = 2;

    public static String toString(int number) {
        return ""+number;
    }
}
