package com.projectmatching.app.domain.team.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.checkerframework.checker.units.qual.A;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class TeamRequestDto {

    @ApiModelProperty(example = "1",name = "작성자 아이디")
    private Long userId;

    @ApiModelProperty(name = "팀 이미지")
    private String image;

    @ApiModelProperty(example = "팀 이름")
    private String name;

    @ApiModelProperty(example = "프로젝트 기간")
    private String session;

    @ApiModelProperty(name = "팀 소개글, 세부내용")
    private String content;

    @ApiModelProperty(example = "기술 스택")
    private List<Integer> skills;
}