package com.projectmatching.app.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.Validatable;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import lombok.*;
import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import static com.projectmatching.app.constant.ServiceConstant.NAME_SIZE_MAX;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@ToString
/**
 * 유저 필수 정보를 담은 dto;
 */
public class UserEssentialDto implements Validatable {

    private String name;
    private String slogan;
    private String image;
    private String content;//자기소개
    private String portfolio;
    private List<Integer> skills; //기술 스택 key 값만 받음
    private String hope_session; //원하는2 작업기간
    private String job; //직업


    @Override
    public void validate() {
        if(name.length() > NAME_SIZE_MAX){
            throw new ResponeException(ResponseTemplateStatus.NAME_SIZE_INVALID);
        }

    }

    public static UserEssentialDto extract(UserDto userDto){
        UserEssentialDto userEssentialDto = new UserEssentialDto();
        BeanUtils.copyProperties(userDto,userEssentialDto);
        return userEssentialDto;
    }
}
