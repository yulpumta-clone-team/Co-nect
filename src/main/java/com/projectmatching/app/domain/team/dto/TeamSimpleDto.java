package com.projectmatching.app.domain.team.dto;


import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.techStack.dto.TechStackDto;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@RequiredArgsConstructor
public class TeamSimpleDto {

    private Long id;
    private String name;
    private UserInfo userInfo;
    private String session;
    private List<TechStackDto> skills;

    @ApiModelProperty(name = "모집 상태 여부, 모집중 / 모집완료")
    private String status;
    
    private Long readCnt;
    private int commentCnt;
    private int likeCnt;


    public static TeamSimpleDto valueOf(Team team, User user){
       TeamSimpleDto teamSimpleDto = new TeamSimpleDto();
        BeanUtils.copyProperties(team,teamSimpleDto);
        teamSimpleDto.userInfo = UserInfo.of(user);
        teamSimpleDto.status = team.getStatus();
        teamSimpleDto.readCnt = Optional.ofNullable(team.getReadCnt()).orElse(0L);
        teamSimpleDto.skills = team.getTeamTeches().stream()
                .map(TeamTechDto::of)
                .map(teamTechDto ->  teamTechDto.getTechStack())
                .collect(Collectors.toList());

        teamSimpleDto.commentCnt = team.getTeamComments().size();
        teamSimpleDto.likeCnt = team.getTeamLikings().size();
        return teamSimpleDto;
    }



}
