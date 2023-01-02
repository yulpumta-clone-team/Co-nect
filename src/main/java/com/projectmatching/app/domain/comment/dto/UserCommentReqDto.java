package com.projectmatching.app.domain.comment.dto;

import com.projectmatching.app.domain.comment.entity.UserComment;
import com.projectmatching.app.domain.liking.dto.UserCommentLikingDto;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.dto.UserInfoDto;
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
public class UserCommentReqDto {


    @ApiModelProperty(notes = "해당 댓글이 속한 유저 게시물의 id")
    private Long userId; //댓글이 속한 글의 id(유저)

    @ApiModelProperty(value = "해당 댓글이 속한 댓글 id, 즉 부모 아이디가 없으면 일반 댓글, 있으면 대댓글")
    private Long parentId;


    @ApiModelProperty(value = "댓글 비밀 여부")
    private Boolean secret;

    @ApiModelProperty(value = "댓글 내용")
    private String content;


    //dto를 entity로
    public UserComment asEntity(){
        UserComment userComment = new UserComment();
        BeanUtils.copyProperties(this, userComment);
        userComment.setId(IdGenerator.number());
        return userComment;

    }


}
