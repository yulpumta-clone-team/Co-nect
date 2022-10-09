package com.projectmatching.app.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projectmatching.app.domain.user.entity.User;
import io.swagger.annotations.ApiModelProperty;


//작성자 정보가 담길 DTO가 상속함
public abstract class UserInfoDto {

    @ApiModelProperty(value = "댓글 작성자 정보")
    protected UserInfo userInfo;


    public void setUserInfoWith(User user){
       this.userInfo = UserInfo.of(user);
    }
    public UserInfo getUserInfo(){
       return this.userInfo;
    }

}
