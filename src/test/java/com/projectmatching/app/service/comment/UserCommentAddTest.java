package com.projectmatching.app.service.comment;

import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.domain.comment.dto.UserCommentReqDto;
import com.projectmatching.app.domain.comment.entity.UserComment;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

@DisplayName("유저 댓글 작성 테스트")
public class UserCommentAddTest {



    @InjectMocks
    private CommentService commentService;


//
//    @DisplayName("유저 프로필에 댓글 달기 성공")
//    @Test
//    void addUserComment_Succeess(){
//        //댓글달리는 대상
//        User user = User.builder().id(1234567890L).email("testing@user.com").content("testUser").build();
//
//        UserDetailsImpl userDetails = UserDetailsImpl.builder()
//                .id(user.getId())
//                .email(user.getEmail())
//                .name(user.getName())
//                .role(Role.USER)
//                .build();
//
//        //달 댓글
//       UserCommentReqDto userCommentReqDto = UserCommentReqDto.builder()
//                .content("테스트 댓글")
//                .userId(user.getId())
//                .build();
//
//
//        UserComment userComment = userCommentReqDto.asEntity();
//
//        UserCommentDto userCommentDto = UserCommentDto.of(userComment);
//
//    }



}
