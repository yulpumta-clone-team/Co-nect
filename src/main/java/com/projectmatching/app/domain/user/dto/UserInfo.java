package com.projectmatching.app.domain.user.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projectmatching.app.domain.user.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;


@Setter @Getter
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
