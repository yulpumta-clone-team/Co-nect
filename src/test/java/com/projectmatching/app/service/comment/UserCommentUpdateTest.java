package com.projectmatching.app.service.comment;

import com.projectmatching.app.constant.ServiceConstant;
import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.domain.comment.dto.UserCommentReqDto;
import com.projectmatching.app.domain.comment.entity.UserComment;
import com.projectmatching.app.domain.comment.repository.UserCommentRepository;
import com.projectmatching.app.domain.liking.repository.UserCommentLikingRepository;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectLogicalException;
import com.projectmatching.app.exception.CoNectRuntimeException;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.util.IdGenerator;
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;


import java.util.Optional;


import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@DisplayName("유저 댓글 수정 테스트")
@SpringBootTest
public class UserCommentUpdateTest extends ServiceTest {


    private static MockedStatic<UserCommentDto> UserCommentDtoStatic;

    private static MockedStatic<IdGenerator> idGenerator;

    @SpyBean
    private UserCommentRepository userCommentRepository;

    private UserCommentLikingRepository userCommentLikingRepository;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private CommentService commentService;

    private UserDetailsImpl userDetails;



    @BeforeEach
    void setUp(){
        userDetails = UserDetailsImpl.builder()
                .name("testMan")
                .id(111111111111L)
                .email("testMan@naver.com")
                .role(Role.USER)
                .build();
    }


    @DisplayName("유저 댓글 수정 성공 테스트: 부모 댓글인 경우")
    @Test
    void Given_Updated_CommentReq_With_ParentId_is_Root_Then_Success(){

        User user = User.builder()
                .id(9191919191919L)
                .email("ownerUser@naver.com")
                .build();

        UserComment willBeUpdatedComment = UserComment.builder()
                .id(123456789L)
                .user(user)
                .content("업데이트될 댓글")
                .writer("testMan")
                .parent(null)
                .build();

        UserCommentReqDto userCommentReqDto = UserCommentReqDto.builder()
                .content("이 내용으로 업데이트 할게요")
                .parentId(ServiceConstant.ROOT_COMMENT)
                .userId(user.getId())
                .build();



        doReturn(Optional.of(willBeUpdatedComment)).when(userCommentRepository).findById(anyLong());

        commentService.updateUserComment(userCommentReqDto,userDetails,123456789L);


    }

    @DisplayName("유저 댓글 수정 실패 테스트 : 수정 요청 내용 중 부모 댓글이 변경된 경우 실패")
    @Test
    void Given_Different_ParentId_Comment_Req_Then_Fail(){
        User user = User.builder()
                .id(9191919191919L)
                .email("ownerUser@naver.com")
                .build();

        UserComment dummyParent = UserComment.builder()
                .id(111111111111L)
                .user(user)
                .build();

        UserComment willBeUpdatedComment = UserComment.builder()
                .id(123456789L)
                .parent(dummyParent)
                .content("업데이트될 댓글")
                .writer("testMan")
                .user(user)
                .build();

        UserCommentReqDto userCommentReqDto = UserCommentReqDto.builder()
                .content("이 내용으로 업데이트 할게요")
                .parentId(4L)
                .userId(user.getId())
                .build();

        doReturn(Optional.of(willBeUpdatedComment)).when(userCommentRepository).findById(anyLong());

        Assertions.assertThrows(CoNectLogicalException.class,()->{
            commentService.updateUserComment(userCommentReqDto,userDetails,123456789L);
        });

    }


    @DisplayName("유저 댓글 수정 실패 테스트 : 수정 하려는 댓글이 본인 댓글이 아닌 경우 실패 ")
    @Test
    void Given_Different_Wirter_Then_Fail(){

        User user = User.builder()
                .id(9191919191919L)
                .email("ownerUser@naver.com")
                .build();

        UserComment willBeUpdatedComment = UserComment.builder()
                .id(123456789L)
                .parent(null)
                .content("업데이트될 댓글")
                .writer("NotTestMan")
                .user(user)
                .build();

        UserCommentReqDto userCommentReqDto = UserCommentReqDto.builder()
                .content("이 내용으로 업데이트 할게요")
                .parentId(4L)
                .userId(user.getId())
                .build();


        doReturn(Optional.of(willBeUpdatedComment)).when(userCommentRepository).findById(anyLong());

        Assertions.assertThrows(CoNectRuntimeException.class,()->{
            commentService.updateUserComment(userCommentReqDto,userDetails,123456789L);
        });

    }

}
