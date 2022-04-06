package com.projectmatching.app.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.Validatable;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;
import org.springframework.beans.BeanUtils;

import java.util.List;

import static com.projectmatching.app.constant.ServiceConstant.REGEX_EMAIL;
import static com.projectmatching.app.constant.ServiceConstant.REGEX_PWD;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음

public class UserJoinDto implements Validatable {

    @JsonIgnore
    private Long id = IdGenerator.number();
    private String email;

    private String name;

    private String pwd;

    private String portfolio;
    private String slogan;
    private String img;
    private String content;//자기소개
    private List<String> skills;
    private String hope_session; //원하는 작업기간
    private String job; //직업

    public static UserJoinDto createEmpty() { return new UserJoinDto();}

    //dto를 entity로
    public User asEntity(Role role){
        User user = new User();
        BeanUtils.copyProperties(this,user);
        user.setRole(role);
        return user;

    }


    //entity를 dto로
    public static UserJoinDto of(User user){
        UserJoinDto userJoinDto = createEmpty();
        BeanUtils.copyProperties(user, userJoinDto);
        return userJoinDto;
    }

    /**
     * 회원가입 유저 Validation 체크
     * 1. 이메일 형식 검사
     * 2. 비밀번호 형식 검사
     */
    @Override
    public void validate() {
        if(!REGEX_EMAIL.matcher(this.email).matches()){
            throw new ResponeException(ResponseTemplateStatus.EMAIL_FORM_INVALID);
        }

        if(!REGEX_PWD.matcher(this.pwd).matches()){
            throw new ResponeException(ResponseTemplateStatus.PWD_FORM_INVALID);
        }

    }
}
