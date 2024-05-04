package com.zengaku.mvc.controller;

import com.zengaku.mvc.model.AutoMailCfg;

import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class EmailFactory {
    // Get properties object
    public static void sendMail(String receiverEmail, String name, int codeNumber){

    Properties props = new Properties();
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.host", AutoMailCfg.HOST_NAME);
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.port", AutoMailCfg.TSL_PORT);


    Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
        protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(AutoMailCfg.APP_EMAIL, AutoMailCfg.APP_PASSWORD);
        }
    });

        try {
        MimeMessage message = new MimeMessage(session);
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(receiverEmail));
        message.setSubject("[ZenGaku - No-reply]: Verification your account.");
        String body = "<html>\n" +
                "<body>\n" +
                "<p> Welcome to ZenGaku, "+name+"!<br>It is really exciting when you decide to register " +
                "a new ZenGaku account. Before using your account, " +
                "please confirm that you registered your account. " +
                "Thank you!<br><br><br>" +
                "Your number code is: <b>"+codeNumber+"</b>\n" +
                "</p>\n" +
                "</body>\n" +
                "</html>";
        message.setContent(body, "text/html; charset=utf-8");

        Transport.send(message);
    } catch (MessagingException e) {
        throw new RuntimeException(e);
    }
}
}
