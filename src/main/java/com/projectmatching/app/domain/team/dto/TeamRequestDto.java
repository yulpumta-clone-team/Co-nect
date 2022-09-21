package com.projectmatching.app.domain.team.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.checkerframework.checker.units.qual.A;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamRequestDto {

    @ApiModelProperty(name = "팀 이미지")
    private String image;

    @ApiModelProperty(example = "팀 이름")
    private String name;

    @ApiModelProperty(name = "팀 간단소개(슬로건)")
    private String slogan;

    @ApiModelProperty(example = "프로젝트 기간")
    private String session;

    @ApiModelProperty(name = "팀 소개글, 세부내용")
    private String content;

    @ApiModelProperty(example = "기술 스택")
    private List<Integer> skills;
}