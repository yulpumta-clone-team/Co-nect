package com.projectmatching.app.domain.user.dto;


import com.projectmatching.app.domain.user.entity.User;
import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfo {

    private Long id;
    private String name;
    private String image;


    public static UserInfo of(User user){
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.getId());
        userInfo.setName(user.getName());
        userInfo.setImage(user.getImage());
        return userInfo;

    }



}
