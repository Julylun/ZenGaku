package com.zengaku.mvc.model.DTO;

import com.zengaku.mvc.model.User;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String userAvatar;
    public UserDTO(Long id, String username, String firstname, String lastname, String userAvatar) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.userAvatar = userAvatar;
    }

    public UserDTO(User user) {
        this(user.getId(), user.getUserName(), user.getUserFirstName(), user.getUserLastName(), user.getUserAvatar());
    }
}
