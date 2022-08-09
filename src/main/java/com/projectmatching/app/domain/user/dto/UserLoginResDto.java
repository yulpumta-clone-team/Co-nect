package com.projectmatching.app.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.user.entity.User;
import lombok.*;


/**
 * 오직 로그인시에 반환되는 DTO
 */
@Deprecated
@Getter @Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음
public class UserLoginResDto{

    private Long id;
    private String img;
    private String email;
    private String name;
    private Boolean isFirst;//최초 로그인인지 확인하는 부분


    public static UserLoginResDto toUserLoginResDto(User user) {

        UserLoginResDto userLoginResDto = UserLoginResDto.builder()
                .img(user.getImage())
                .email(user.getEmail())
                .id(user.getId())
                .name(user.getName())
                .isFirst(isFirstLoginUser(user))
                .build();
        return userLoginResDto;

    }


    //최초 로그인인지 확인
    private static boolean isFirstLoginUser(User user){
        //자기소개도 없고 기술스택도 설정하지 않았다면 최초 로그인한 유저와 같다고 판단
        if(user.getSlogan() == null || user.getSkills().isEmpty()) return true;
        else return false;
    }


}
