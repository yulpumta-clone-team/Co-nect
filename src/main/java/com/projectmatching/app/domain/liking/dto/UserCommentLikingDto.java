package com.projectmatching.app.domain.liking.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.domain.liking.entity.UserCommentLiking;
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
/**
 * 해당 댓글 좋아요한 유저 id목록
 */
public class UserCommentLikingDto {


    private Long id = IdGenerator.number();
    private UserDto userDto;
    private UserCommentDto userCommentDto;


    public static UserCommentLikingDto of(UserCommentLiking userCommentLiking){
        UserCommentLikingDto userLikingDto = new UserCommentLikingDto();
        userLikingDto.userDto = UserDto.of(userCommentLiking.getUser());
        userLikingDto.userCommentDto =  UserCommentDto.of(userCommentLiking.getUserComment());
        return userLikingDto;
    }

    public UserCommentLiking asEntity(){
        UserCommentLiking userCommentLiking = new UserCommentLiking();
        userCommentLiking.setUser(userDto.asEntity());
        userCommentLiking.setUserComment(userCommentDto.asEntity());
        return userCommentLiking;
    }
}
