package com.zengaku.mvc.controller.LocalStorage;

import java.io.File;
import java.util.Scanner;

public class FileAnalyzer {
    public static final String savedDataPath = "user/savedData.json";
    public static String readAllTextFromFile(String filePath) {
        try {
            StringBuilder stringContent = new StringBuilder();
            Scanner scanner = new Scanner(Thread.currentThread().getContextClassLoader().getResourceAsStream(filePath));
            while(scanner.hasNext()) {
                stringContent.append(scanner.next());
            }
            return stringContent.toString();
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
