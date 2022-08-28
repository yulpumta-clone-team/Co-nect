package com.projectmatching.app.domain.team.dto;

import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.user.dto.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class TeamResponseDto{

    private Long id;
    private UserInfo user;
    private String session;
    private List<String> skills;

    private String status;
    private Long readCnt;
    private int commentCnt;
    private int likeCnt;



    public static TeamResponseDto createEmpty(){return new TeamResponseDto();}

    //entity를 dto로
    public static TeamResponseDto of(Team team){
        TeamResponseDto teamResponseDto = createEmpty();
        BeanUtils.copyProperties(team, teamResponseDto);

        teamResponseDto.commentCnt = team.getTeamComments().size();
        teamResponseDto.likeCnt = team.getTeamLikings().size();


        return teamResponseDto;
    }

    //dto를 entity로
    public Team asEntity(){
        Team team = new Team();
        BeanUtils.copyProperties(this,team);
        return team;
    }
}
