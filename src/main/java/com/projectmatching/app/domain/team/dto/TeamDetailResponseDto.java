package com.projectmatching.app.domain.team.dto;

import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.domain.user.entity.UserTeam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class TeamDetailResponseDto {

    private Long userId;
    private Long teamId;
    private String name;
    private String content;
    private String session;
    private List<String> skills;
    private String img;
    private Long read;
    private Boolean status;
    private int commentCnt;
    private int likeCnt;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    private List<TeamCommentDto> teamComments;

    public static TeamDetailResponseDto createEmpty(){return new TeamDetailResponseDto();}


    //entity를 dto로
    public static TeamDetailResponseDto of(Team team){
        TeamDetailResponseDto teamResponseDto = createEmpty();
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
