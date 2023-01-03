package com.projectmatching.app.domain.team.dto;

import com.projectmatching.app.domain.liking.dto.TeamLikingDto;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.techStack.dto.TechStackDto;
import com.projectmatching.app.domain.user.dto.UserInfoDto;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.dto.users.UserTeamDto;
import com.projectmatching.app.domain.user.entity.User;
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
public class TeamDto extends UserInfoDto {

    private Long id;

    private String image;
    private String slogan;
    private String name;
    private String session;

    private String content;
    private Long readCnt;
    private int likeCnt;
    private int commentCnt;

    private List<UserTeamDto> userTeamList;
    private List<TeamLikingDto> teamLikings;

    private List<TechStackDto> skills;

    public static TeamDto valueOf(Team team, User user){
        TeamDto teamDto = TeamDto.of(team);
        teamDto.userInfo =  UserInfo.of(user);
        return teamDto;
    }

    public static TeamDto of(Team team){
        TeamDto teamDto = new TeamDto();
        BeanUtils.copyProperties(team,teamDto);
        teamDto.readCnt = Optional.ofNullable(team.getReadCnt()).orElse(0L);

        teamDto.commentCnt = team.getTeamComments().size();
        teamDto.likeCnt = team.getTeamLikings().size();

        teamDto.userTeamList = team.getUserTeams().stream()
                .map(UserTeamDto::forTeamOf).collect(Collectors.toList());

        teamDto.teamLikings = team.getTeamLikings().stream()
                .map(TeamLikingDto::of)
                .collect(Collectors.toList());

        teamDto.skills = team.getTeamTeches().stream()
                .map(TeamTechDto::of)
                .map(teamTechDto ->  teamTechDto.getTechStack())
                .collect(Collectors.toList());

        return teamDto;
    }





}
