package com.projectmatching.app.domain.user.dto;


import com.projectmatching.app.domain.user.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ApiModel(description = "유저 정보")
public class UserInfo {

    @ApiModelProperty(
            name = "유저 아이디"
    )
    private Long id;
    
    @ApiModelProperty(name = "유저 이름")
    private String name;
    
    @ApiModelProperty(name = "유저 이미지")
    private String image;


    public static UserInfo of(User user){
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.getId());
        userInfo.setName(user.getName());
        userInfo.setImage(user.getImage());
        return userInfo;

    }



}
