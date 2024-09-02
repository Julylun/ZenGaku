package com.zengaku.mvc.model.DTO;

import com.zengaku.mvc.model.Post;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostDTO {
    private long id;
    private String uuid;
    private String postText;
    private String imageLink;
    private LocalDateTime uploadDate;
    private int treeHeartNumber;
    private Long authorId;
    private String authorFirstName;
    private String authorLastName;
    private String authorAvatarLink;
    private Boolean isLiked;
    public PostDTO(Post post, Boolean isLiked){
        id = post.getId();
        uuid = post.getUuid();
        postText = post.getPostText();
        imageLink = post.getImageLink();
        uploadDate = post.getUploadDate();
        treeHeartNumber = post.getTreeHeartNumber();
        authorId = post.getAuthor().getId();
        authorFirstName = post.getAuthor().getUserFirstName();
        authorLastName = post.getAuthor().getUserLastName();
        authorAvatarLink = post.getAuthor().getUserAvatar();
        this.isLiked = isLiked;
    }
}
