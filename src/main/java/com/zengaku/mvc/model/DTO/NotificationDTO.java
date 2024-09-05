package com.zengaku.mvc.model.DTO;

import com.zengaku.mvc.model.Notification;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class NotificationDTO {
    private long id;
    private String title;
    private String content;
    private int type;
    private LocalDateTime time;
    public NotificationDTO(Notification notification){
        this.id = notification.getId();
        this.title = notification.getTitle();
        this.content = notification.getContent();
        this.type = notification.getType();
        this.time = notification.getDateTime();
    }

}
