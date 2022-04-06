package com.projectmatching.app.domain.liking.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.domain.liking.entity.TeamCommentLiking;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TeamCommentLikingDto {
    private Long id = IdGenerator.number();
    private UserDto userDto;
    private TeamCommentDto teamCommentDto;

    public static TeamCommentLikingDto of(TeamCommentLiking teamCommentLiking){
        TeamCommentLikingDto teamLikingDto = new TeamCommentLikingDto();
        teamLikingDto.userDto = UserDto.of(teamCommentLiking.getUser());
        teamLikingDto.teamCommentDto = TeamCommentDto.of(teamCommentLiking.getTeamComment());
        return teamLikingDto;
    }

    public TeamCommentLiking asEntity(){
        TeamCommentLiking teamCommentLiking = new TeamCommentLiking();
        teamCommentLiking.setUser(userDto.asEntity());
        teamCommentLiking.setTeamComment(teamCommentDto.asEntity());
        return teamCommentLiking;
    }
}
