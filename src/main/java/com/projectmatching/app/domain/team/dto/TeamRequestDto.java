package com.projectmatching.app.domain.team.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class TeamRequestDto {
    @ApiModelProperty(example = "팀 이름")
    private String name;

    @ApiModelProperty(example = "프로젝트 기간")
    private String session;

    @ApiModelProperty(example = "이미지")
    private String img;

    @ApiModelProperty(example = "팀 소개글")
    private String content;

    @ApiModelProperty(example = "기술 스택")
    private List<String> techs;
}