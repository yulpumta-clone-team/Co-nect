package com.projectmatching.app.domain.liking.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.domain.liking.entity.TeamCommentLiking;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.util.IdGenerator;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TeamCommentLikingDto {
    @JsonIgnore
    private Long id = IdGenerator.number();

    @ApiModelProperty(name = "해당 댓글 좋아요한 유저 아이디")
    private Long userId;



    public static TeamCommentLikingDto of(TeamCommentLiking teamCommentLiking){
        TeamCommentLikingDto teamLikingDto = new TeamCommentLikingDto();
        teamLikingDto.userId = teamCommentLiking.getUser().getId();
        return teamLikingDto;
    }

    public TeamCommentLiking asEntity(){
        TeamCommentLiking teamCommentLiking = new TeamCommentLiking();

        return teamCommentLiking;
    }
}
