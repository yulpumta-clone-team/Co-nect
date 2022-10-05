package com.projectmatching.app.domain.liking.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.domain.liking.entity.UserCommentLiking;
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
/**
 * 해당 댓글 좋아요한 유저 id목록
 */
public class UserCommentLikingDto {


    @JsonIgnore
    private Long id = IdGenerator.number();


    @ApiModelProperty(name = "해당 댓글 좋아요한 유저 아이디")
    private Long userId;



    public static UserCommentLikingDto of(UserCommentLiking userCommentLiking){
        UserCommentLikingDto userLikingDto = new UserCommentLikingDto();
        userLikingDto.userId = userCommentLiking.getUser().getId();

        return userLikingDto;
    }

    public UserCommentLiking asEntity(){
        UserCommentLiking userCommentLiking = new UserCommentLiking();

        return userCommentLiking;
    }
}
