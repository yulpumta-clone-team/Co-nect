package com.projectmatching.app.domain.team.dto;


import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class TeamSimpleDto {

    private Long id;
    private String name;
    private UserInfo userInfo;
    private String session;
    private List<TechStack> skills;

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
        teamSimpleDto.readCnt = team.getReadCnt();
        teamSimpleDto.commentCnt = team.getTeamComments().size();
        teamSimpleDto.likeCnt = team.getTeamLikings().size();
        return teamSimpleDto;
    }

}
