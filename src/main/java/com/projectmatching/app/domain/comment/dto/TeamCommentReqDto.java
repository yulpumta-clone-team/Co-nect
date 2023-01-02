package com.projectmatching.app.domain.comment.dto;

import com.projectmatching.app.domain.comment.entity.TeamComment;
import com.projectmatching.app.util.IdGenerator;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeamCommentReqDto {


    @ApiModelProperty(notes = "해당 댓글이 속한 유저 게시물의 id")
    private Long teamId; //댓글이 속한 글의 id(유저)

    @ApiModelProperty(value = "해당 댓글이 속한 댓글 id, 즉 부모 아이디가 없으면 일반 댓글, 있으면 대댓글")
    private Long parentId;


    @ApiModelProperty(value = "댓글 비밀 여부")
    private Boolean secret;

    @ApiModelProperty(value = "댓글 내용")
    private String content;




    public TeamComment asEntity(){
        TeamComment teamComment = new TeamComment();

        BeanUtils.copyProperties(this,teamComment);
        teamComment.setId(IdGenerator.number());
        return teamComment;
    }
}
