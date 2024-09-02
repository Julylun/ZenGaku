package com.zengaku.mvc.controller;

import com.zengaku.mvc.model.DefaultData;

import java.util.ArrayList;
import java.util.List;

public class LanguageFilter {

    // Hàm để kiểm tra và thay thế các từ tục tĩu
    public static String filterBadWords(String input) {
        String filteredInput = input;
        try{
            for (String word : DefaultData.badWords) {
                // Tạo một biểu thức chính quy để tìm từ tục tĩu
                String regex = "\\b" + word + "\\b";
                // Thay thế từ tục tĩu bằng dấu hoa thị
                filteredInput = filteredInput.replaceAll(regex, "[CẤM]");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return filteredInput;
    }
}