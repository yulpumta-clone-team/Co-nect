package com.projectmatching.app.domain.user.dto.users;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.domain.user.entity.UserTeam;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음
public class UserTeamDto {

    private Long id;

    private Long teamId;

    private UserInfo user;


    /**
     * 팀에 소속한 유저 정보를 반환
     * @param userTeam
     * @return UserTeamDto(only UserInfo)
     */
    public static UserTeamDto forTeamOf(UserTeam userTeam){

        UserTeamDto userTeamDto = new UserTeamDto();
        userTeamDto.setUser(UserInfo.of(userTeam.getUser()));

        return userTeamDto;

    }

    /**
     * 유저가 속한 팀들을 반환
     * @param userTeam
     * @return UserTeamDto(only teamId)
     */
    public static UserTeamDto forUserOf(UserTeam userTeam){

        UserTeamDto userTeamDto = new UserTeamDto();
        userTeamDto.setTeamId(userTeamDto.getTeamId());

        return userTeamDto;
    }



}
