package com.projectmatching.app.service.liking;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.comment.entity.UserComment;
import com.projectmatching.app.domain.comment.repository.UserCommentRepository;
import com.projectmatching.app.domain.liking.entity.UserCommentLiking;
import com.projectmatching.app.domain.liking.repository.QUserCommentLikingRepository;
import com.projectmatching.app.domain.liking.repository.UserCommentLikingRepository;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.exception.CoNectRuntimeException;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.service.comment.CommentService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Optional;

import static org.mockito.Mockito.*;

@DisplayName("유저 댓글 좋아요 테스트")
public class UserCommentLikingTest extends ServiceTest {

    @InjectMocks
    private CommentService commentService;

    @Mock
    private UserCommentRepository userCommentRepository;

    @Mock
    private UserCommentLikingRepository userCommentLikingRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private QUserCommentLikingRepository qUserCommentLikingRepository;


    private final Long commentIdForTest = 19828395891919L;
    @DisplayName("유저 댓글 좋아요 하기 성공")
    @Test
    void Given_UserDetails_And_CommnetId_Then_add_UserCommentLiking_Then_Success(){

        when(userCommentRepository.findById(any(Long.class))).thenReturn(Optional.of(mock(UserComment.class)));

        when(userRepository.findByName(any())).thenReturn(Optional.of(mock(User.class)));

        when(qUserCommentLikingRepository.isExistWithUserIdAndCommentId(anyLong(),anyLong())).thenReturn(false);


        commentService.doUserCommentLiking(mock(UserDetailsImpl.class),commentIdForTest);

        verify(userCommentLikingRepository).save(any(UserCommentLiking.class));
    }


    @DisplayName("유저 댓글 좋아요 하기 실패 : 특정 유저가 이미 좋아요 한 댓글 또 다시 좋아요 못함")
    @Test
    void Given_Meaningless_liking_Commemnt_Then_Throw_Forbidden_Exception(){
        when(userCommentRepository.findById(any(Long.class))).thenReturn(Optional.of(mock(UserComment.class)));

        when(userRepository.findByName(any())).thenReturn(Optional.of(mock(User.class)));

        when(qUserCommentLikingRepository.isExistWithUserIdAndCommentId(anyLong(),anyLong())).thenReturn(true);


        Assertions.assertThrows(CoNectRuntimeException.class,()->{
            commentService.doUserCommentLiking(mock(UserDetailsImpl.class),commentIdForTest);

        });

    }





    @DisplayName("유저 댓글 좋아요 취소 성공")
    @Test
    void Given_Del_UserCommentLiking_Success(){

        when(userCommentLikingRepository.findUserCommentLikingByUserNameAndUserCommentId(any(),anyLong()))
                .thenReturn(Optional.of(mock(UserCommentLiking.class)));


        commentService.cancelUserCommentLiking(mock(UserDetailsImpl.class),commentIdForTest);

        verify(userCommentLikingRepository).delete(any(UserCommentLiking.class));
    }


    @DisplayName("유저 댓글 좋아요 취소 실패 : 좋아요 누른적이 없음")
    @Test
    void Given_No_UserCommentLiking_Delete_Then_Fail(){
        when(userCommentLikingRepository.findUserCommentLikingByUserNameAndUserCommentId(any(),anyLong())).thenThrow(CoNectNotFoundException.class);

        Assertions.assertThrows(ResponeException.class,()->{

            commentService.cancelUserCommentLiking(mock(UserDetailsImpl.class),commentIdForTest);
        });
    }
}
