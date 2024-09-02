package com.zengaku.mvc.model.DTO;

import com.zengaku.mvc.model.Notification;

import java.time.LocalDateTime;

public class NotificationDTO {
    private long id;
    private String title;
    private String content;
    private String href;
    private LocalDateTime time;
    public NotificationDTO(Notification notification){
        this.id = notification.getId();
        this.title = notification.getTitle();
        this.content = notification.getContent();
        this.href = notification.getHref();
        this.time = notification.getDateTime();
    }

}
