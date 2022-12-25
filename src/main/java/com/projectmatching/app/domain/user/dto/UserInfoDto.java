package com.projectmatching.app.domain.user.dto;

import com.projectmatching.app.domain.user.entity.User;
import io.swagger.annotations.ApiModelProperty;


//작성자 정보가 담길 DTO가 상속함
public class UserInfoDto {

    @ApiModelProperty(value = "댓글 작성자 정보")
    public UserInfo userInfo;


    public UserInfo setUserInfoWith(User user) {
        return UserInfo.of(user);
    }
}