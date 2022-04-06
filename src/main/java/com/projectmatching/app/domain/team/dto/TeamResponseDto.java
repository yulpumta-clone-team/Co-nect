package com.projectmatching.app.domain.team.dto;

import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.domain.user.entity.UserTeam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class TeamResponseDto {
    private Long userId;
    private Long teamId;
    private String name;
    private String session;
    private String img;
    private Long read;
    private int commentCnt;
    private int likeCnt;
    private List<String> skills;
    private Boolean status;


    public static TeamResponseDto createEmpty(){return new TeamResponseDto();}

    //entity를 dto로
    public static TeamResponseDto of(Team team){
        TeamResponseDto teamResponseDto = createEmpty();
        BeanUtils.copyProperties(team, teamResponseDto);


        teamResponseDto.commentCnt = team.getTeamComments().size();
        teamResponseDto.likeCnt = team.getTeamLikings().size();

        teamResponseDto.status = team.getStatus()=="NA" ? Boolean.FALSE : Boolean.TRUE;

        return teamResponseDto;
    }

    //dto를 entity로
    public Team asEntity(){
        Team team = new Team();
        BeanUtils.copyProperties(this,team);
        return team;
    }
}
