package com.zengaku.mvc.model.DTO;

import com.zengaku.mvc.model.Post;
import com.zengaku.mvc.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDTO {
    private Long id;
    private String commentText;
    private LocalDateTime commentDate;
    private String authorName;
    private String authorAvatarHref;
    private Long authorId;
    private String postFatherUUID;

    public CommentDTO(){

    }
    public CommentDTO(Long id, String commentText, LocalDateTime commentDate, String authorName, String authorAvatarHref, Long authorId, String postFatherUUID) {
        this.id = id;
        this.commentText = commentText;
        this.commentDate = commentDate;
        this.authorName = authorName;
        this.authorAvatarHref = authorAvatarHref;
        this.authorId = authorId;
        this.postFatherUUID = postFatherUUID;
    }
}
