package com.zengaku.mvc.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zengaku.mvc.model.DTO.PostDTO;
import com.zengaku.mvc.model.Post;
import com.zengaku.mvc.model.TreeHeartUser;
import org.glassfish.grizzly.ThreadCache;

import java.util.ArrayList;
import java.util.List;

public class JsonFactory {
    public static String listToJson(List list) {
        try {
//            return new ObjectMapper().registerModule(new JavaTimeModule())
//                    .writerWithDefaultPrettyPrinter()
//                    .writeValueAsString(list);
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(list);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    public static String objectToJsonString(Object o) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(o);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
