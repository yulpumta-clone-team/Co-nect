package com.projectmatching.app.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.entity.User;
import lombok.*;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음

/**
 * 유저 필수 정보를 담은 dto;
 */
public class UserEssentialDto {

    private String name;
    private String portfolio;
    private String slogan;
    private String image;
    private String content;//자기소개
    private List<Integer> skills; //기술 스택 key 값만 받음
    private String hope_session; //원하는2 작업기간
    private String job; //직업




}
