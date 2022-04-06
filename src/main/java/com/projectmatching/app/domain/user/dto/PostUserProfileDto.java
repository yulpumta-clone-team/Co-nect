package com.projectmatching.app.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음
public class PostUserProfileDto {

    //유저명은 필요없음

    private String slogan; //각오
    private String description; //소개 내용
    private String img;
    private String hope_session;
    private List<String> skills;
    private String job;
    private String portfolio; //개인 작업 또는 팀 작업 포트폴리오 url



}
