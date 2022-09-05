package com.projectmatching.app.domain.team.dto;

import com.projectmatching.app.domain.comment.entity.TeamComment;
import com.projectmatching.app.domain.liking.entity.TeamLiking;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.entity.UserTeam;
import com.projectmatching.app.util.StreamUtil;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;


@Getter
@Setter
@RequiredArgsConstructor
public class TeamDto {

    private Long id;
    private UserInfo userInfo;
    private String image;
    private String slogan;
    private String name;
    private String session;

    private String content;


    private Long readCnt;
    @ApiModelProperty(name = "해당 팀에 속한 유저들")
    private List<UserTeam> userTeamList;


    private List<TeamComment> comments;
    @ApiModelProperty(name = "해당 팀을 좋아요함 유저정보")
    private List<TeamLiking> teamLikings;

    @ApiModelProperty(name = "해당 팀의 기술 스택들")
    private List<TeamTech> teamTeches;

    public static TeamDto of(Team team){
        TeamDto teamDto = new TeamDto();
        BeanUtils.copyProperties(team,teamDto);
        teamDto.comments = team.getTeamComments().stream().collect(Collectors.toList());
        teamDto.userTeamList = team.getUserTeams().stream().collect(Collectors.toList());
        teamDto.teamLikings = team.getTeamLikings().stream().collect(Collectors.toList());
        teamDto.teamTeches = team.getTeamTeches().stream().collect(Collectors.toList());

        return teamDto;
    }

}
