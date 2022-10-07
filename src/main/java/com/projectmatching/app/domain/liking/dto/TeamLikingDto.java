package com.projectmatching.app.domain.liking.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.liking.entity.TeamLiking;
import com.projectmatching.app.domain.team.dto.TeamDto;
import com.projectmatching.app.domain.user.dto.UserInfo;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음
public class TeamLikingDto {

    @JsonIgnore
    private Long id;

    private UserInfo user;



    public static TeamLikingDto of(TeamLiking teamLiking){

        TeamLikingDto teamLikingDto = new TeamLikingDto();
        teamLikingDto.id =  teamLiking.getId();
        teamLikingDto.user = UserInfo.of(teamLiking.getUser());


        return teamLikingDto;

    }

}
