package com.projectmatching.app.domain.team.dto;


import com.amazonaws.services.ec2.model.InternetGateway;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.domain.user.dto.UserInfo;
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

    private String name;
    private UserInfo userInfo;
    private String session;
    private List<TechStack> skills;

    @ApiModelProperty(name = "모집 상태 여부, 모집중 / 모집완료")
    private String status;
    
    private int readCnt;
    private int commentCnt;
    private int likeCnt;


    public static TeamSimpleDto of(Team team){
       TeamSimpleDto teamSimpleDto = new TeamSimpleDto();
        BeanUtils.copyProperties(team,teamSimpleDto);
        teamSimpleDto.userInfo.setName();
    }

}
