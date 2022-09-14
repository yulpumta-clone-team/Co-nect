package com.projectmatching.app.domain.team.dto;

import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.domain.comment.entity.TeamComment;
import com.projectmatching.app.domain.liking.dto.TeamLikingDto;
import com.projectmatching.app.domain.liking.dto.UserLikingDto;
import com.projectmatching.app.domain.liking.entity.TeamLiking;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.dto.users.UserTeamDto;
import com.projectmatching.app.domain.user.entity.UserTeam;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.List;
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
    private List<UserTeamDto> userTeamList;

    private List<TeamCommentDto> comments;

    private List<TeamLikingDto> teamLikings;

    private List<TeamTechDto> teamTeches;

    public static TeamDto of(Team team){
        TeamDto teamDto = new TeamDto();
        BeanUtils.copyProperties(team,teamDto);
        teamDto.comments = team.getTeamComments().stream().map(TeamCommentDto::of)
                .collect(Collectors.toList());

        teamDto.userTeamList = team.getUserTeams().stream()
                .map(UserTeamDto::forTeamOf).collect(Collectors.toList());

        teamDto.teamLikings = team.getTeamLikings().stream()
                .map(TeamLikingDto::of)
                .collect(Collectors.toList());
        teamDto.teamTeches = team.getTeamTeches().stream()
                .map(TeamTechDto::of )
                .collect(Collectors.toList());

        return teamDto;
    }

}
