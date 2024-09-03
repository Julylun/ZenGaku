package com.zengaku.mvc.model.DTO;

import com.google.gson.internal.NonNullElementWrapperList;
import com.zengaku.mvc.model.SocialMedia.Message;
import com.zengaku.mvc.model.User;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
public class MessageDTO {
    private String bodyText;
    private Boolean seen;
    private LocalDateTime sendTime;
    private boolean isReceiver;
    private Long receiverId;
    private String receiverFirstname;
    private String receiverLastname;
    public MessageDTO(boolean isReceiver, String bodyText, boolean seen, LocalDateTime sendTime) {
        this.isReceiver = isReceiver;
        this.bodyText = bodyText;
        this.seen = seen;
        this.sendTime = sendTime;
    }

    public static List<MessageDTO> messageListToDTOList(List<Message> messageList, User senderUser) {
        List<MessageDTO> messageDTOList = null;
        try {
            messageDTOList = new ArrayList<>();
            for(Message message: messageList){
                messageDTOList.add(new MessageDTO(
                        !(Objects.equals(message.getFromUser().getId(), senderUser.getId())),
                        message.getBodyText(),
                        message.getSeen(),
                        message.getSendTime()
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return messageDTOList;
        }
    }


}
