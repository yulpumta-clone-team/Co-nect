package com.projectmatching.app.domain.comment.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.comment.entity.TeamComment;
import com.projectmatching.app.domain.liking.dto.TeamCommentLikingDto;
import com.projectmatching.app.domain.liking.entity.TeamCommentLiking;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;
import org.springframework.beans.BeanUtils;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.projectmatching.app.util.StreamUtil.mapToSet;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TeamCommentDto {
    private Long id = IdGenerator.number();
    private Long teamId;
    private String writer;
    private Long parentId;
    private Boolean secret;
    private String content;

    @Builder.Default
    private List<TeamCommentDto> comments = new ArrayList<>();
    @Builder.Default
    private List<TeamCommentLikingDto> feelings = new ArrayList<>();

    public static TeamCommentDto createEmpty() {
        return new TeamCommentDto();
    }

    public static TeamCommentDto of(TeamComment teamComment){
        TeamCommentDto teamCommentDto = createEmpty();
        BeanUtils.copyProperties(teamComment, teamCommentDto);
        teamCommentDto.teamId = teamComment.getTeam().getId();

        if(teamComment.hasParent()){
            teamCommentDto.parentId = teamComment.getParent().getId();
        }

        if(teamComment.hasChildren()){
            teamCommentDto.comments = teamComment.getComments()
                    .stream().map(TeamCommentDto::of).collect(Collectors.toList());
        }

        teamCommentDto.feelings = teamComment.getTeamCommentLikings()
                .stream().map(TeamCommentLikingDto::of).collect(Collectors.toList());

        return teamCommentDto;
    }

    public TeamComment asEntity(){
        TeamComment teamComment = new TeamComment();
        BeanUtils.copyProperties(this, teamComment);

        teamComment.setComments(comments.stream()
                .map(teamCommentDto -> teamCommentDto.asEntity()).collect(Collectors.toSet()));

        teamComment.setTeamCommentLikings(mapToSet(this.feelings,TeamCommentLikingDto::asEntity));

        return teamComment;
    }

}
