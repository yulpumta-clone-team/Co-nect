package com.projectmatching.app.service.liking;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.comment.entity.TeamComment;
import com.projectmatching.app.domain.comment.repository.TeamCommentRepository;
import com.projectmatching.app.domain.liking.entity.TeamCommentLiking;
import com.projectmatching.app.domain.liking.entity.UserCommentLiking;
import com.projectmatching.app.domain.liking.repository.QTeamCommentLikingRepository;
import com.projectmatching.app.domain.liking.repository.TeamCommentLikingRepository;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;


@DisplayName("팀 댓글 좋아요 테스트")
public class TeamCommentLikingTest extends ServiceTest {

    @InjectMocks
    private CommentService commentService;

    @Mock
    private TeamCommentRepository teamCommentRepository;

    @Mock
    private TeamCommentLikingRepository teamCommentLikingRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private QTeamCommentLikingRepository qTeamCommentLikingRepository;


//    private final Long teamIdForTest = 285718237181L;
//    private final Long userIdForTest = 181119191919L;
    private final Long commentIdForTest = 19828395891919L;

    @DisplayName("팀 댓글 좋아요 성공")
    @Test
    void Given_UserDetails_And_CommentId_Then_Add_TeamCommentLiking_Success(){
        when(teamCommentRepository.findById(anyLong())).thenReturn(Optional.of(mock(TeamComment.class)));
        when(userRepository.findByEmail(any())).thenReturn(Optional.of(mock(User.class)));

        when(qTeamCommentLikingRepository.isExistWithUserIdAndCommentId(anyLong(),anyLong())).thenReturn(false);

        commentService.doTeamCommentLiking(mock(UserDetailsImpl.class),commentIdForTest);
        verify(teamCommentLikingRepository).save(any(TeamCommentLiking.class));


    }

    @DisplayName("팀 댓글 좋아요 실패 : 특정 유저가 이미 좋아요 한 댓글 또 다시 좋아요 못함")
    @Test
    void Given_Meaningless_liking_Commemnt_Then_Throw_Forbidden_Exception(){
        when(teamCommentRepository.findById(anyLong())).thenReturn(Optional.of(mock(TeamComment.class)));
        when(userRepository.findByEmail(any())).thenReturn(Optional.of(mock(User.class)));
        when(qTeamCommentLikingRepository.isExistWithUserIdAndCommentId(anyLong(),anyLong())).thenReturn(true);



        Assertions.assertThrows(CoNectRuntimeException.class,()->{
            commentService.doTeamCommentLiking(mock(UserDetailsImpl.class),commentIdForTest);

        });

    }



    @DisplayName("팀 댓글 좋아요 취소 성공")
    @Test
    void Given_Del_TeamCommentLiking_Success(){

        when(userRepository.findByEmail(any())).thenReturn(Optional.of(mock(User.class)));
        when(teamCommentLikingRepository.findByUserIdAndTeamCommentId(any(),anyLong())).thenReturn(Optional.of(mock(TeamCommentLiking.class)));

        commentService.cancelTeamCommentLiking(mock(UserDetailsImpl.class),commentIdForTest);

        verify(teamCommentLikingRepository).delete(any(TeamCommentLiking.class));
    }

    @DisplayName("팀 댓글 좋아요 취소 실패 : 좋아요 누른적이 없음")
    @Test
    void Given_No_TeamCommentLiking_Delete_Then_Fail(){
        when(userRepository.findByEmail(any())).thenReturn(Optional.of(mock(User.class)));
        when(teamCommentLikingRepository.findByUserIdAndTeamCommentId(any(),anyLong())).thenThrow(CoNectNotFoundException.class);

        Assertions.assertThrows(ResponeException.class,()->{

            commentService.cancelTeamCommentLiking(mock(UserDetailsImpl.class),commentIdForTest);
        });
    }


}
