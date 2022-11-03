package com.projectmatching.app.domain.comment.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.comment.entity.TeamComment;
import com.projectmatching.app.domain.liking.dto.TeamCommentLikingDto;
import com.projectmatching.app.domain.user.dto.UserInfoDto;
import com.projectmatching.app.util.IdGenerator;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TeamCommentDto extends UserInfoDto {
    private Long id = IdGenerator.number();

    @ApiModelProperty(value = "해당 댓글이 속한 팀 id")
    @JsonIgnore
    private Long teamId;

    @ApiModelProperty(value = "댓글 작성자")
    @JsonIgnore
    private String writer;

    @ApiModelProperty(value = "해당 댓글이 속한 댓글 id, 즉 부모 아이디가 없으면 일반 댓글, 있으면 대댓글")
    private Long parentId;

    @ApiModelProperty(value = "댓글 비밀 여부")
    private Boolean secret;

    @ApiModelProperty(value = "댓글 내용")
    private String content;

    @Builder.Default
    @ApiModelProperty(notes ="팀 대댓글" )
    private List<TeamCommentDto> replies = new ArrayList<>();

    @Builder.Default
    @ApiModelProperty(value = "해당 댓글 좋아요한 유저 정보")
    private List<TeamCommentLikingDto> feelings = new ArrayList<>();


    @ApiModelProperty(value = "최종 업데이트 시간")
    private LocalDateTime updatedAt;


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
            teamCommentDto.replies = teamComment.getComments()
                    .stream().map(TeamCommentDto::of).collect(Collectors.toList());
        }

        teamCommentDto.feelings = teamComment.getTeamCommentLikings().stream().
                map(teamCommentLiking -> TeamCommentLikingDto.of(teamCommentLiking)
                ).
                collect(Collectors.toList());

        return teamCommentDto;
    }

    public TeamComment asEntity(){
        TeamComment teamComment = new TeamComment();
        BeanUtils.copyProperties(this, teamComment);

        teamComment.setComments(replies.stream()
                .map(teamCommentDto -> teamCommentDto.asEntity()).collect(Collectors.toSet()));


        return teamComment;
    }

}
