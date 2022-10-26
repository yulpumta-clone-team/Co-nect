package com.projectmatching.app.service.comment;

import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.domain.comment.dto.UserCommentReqDto;
import com.projectmatching.app.domain.comment.entity.UserComment;
import com.projectmatching.app.domain.comment.repository.UserCommentRepository;
import com.projectmatching.app.domain.liking.entity.UserCommentLiking;
import com.projectmatching.app.domain.liking.repository.UserCommentLikingRepository;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.service.userInfoAdder.UserInfoAdderService;
import com.projectmatching.app.util.IdGenerator;
import org.junit.jupiter.api.*;
import org.mockito.*;


import java.util.Optional;

import static java.util.Optional.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@DisplayName("유저 댓글 테스트")
public class UserCommentTest extends ServiceTest {


    private static MockedStatic<UserCommentDto> UserCommentDtoStatic;

    private static MockedStatic<IdGenerator> idGenerator;

    @Mock
    private UserCommentRepository userCommentRepository;

    @Mock
    private UserCommentLikingRepository userCommentLikingRepository;

    @Mock
    private UserRepository userRepository;



    @Mock
    private UserInfoAdderService userInfoAdderService;

    @InjectMocks
    private CommentService commentService;



//    @BeforeEach
//    public void beforeClass(){
//        UserCommentDtoStatic = mockStatic(UserCommentDto.class);
//        idGenerator = mockStatic(IdGenerator.class);
//        userComment.setUser(user);
//        userCommentDto = UserCommentDto.of(userComment);
//
//        when(IdGenerator.number()).thenReturn(1234567890L);
//        when(UserCommentDto.of(any(UserComment.class))).then(I->{
//            return userCommentDto;
//        });
//
//
//    }
//
//    @AfterEach
//    public void afterClass(){
//        UserCommentDtoStatic.close();
//        idGenerator.close();
//        System.out.println("UserComment test Class ended");
//    }


//
//    @DisplayName("유저 프로필에 댓글 달기 성공")
//    @Test
//    void addUserComment_Succeess(){
//        //댓글달리는 대상
//        User user = User.builder().id(1234567890L).email("testing@user.com").content("testUser").build();
//
//
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
//        when(userRepository.findById(userCommentReqDto.getUserId())).then(I->{
//            return Optional.of(user);
//        });
//        when(userCommentRepository.save(any(UserComment.class))).then(I-> {
//            UserComment userComment =  I.getArgument(0);
//            return userComment;
//        });
//        userComment.setUser(user);
//
//        when(userInfoAdderService.userInfoAdder(userCommentDto,user.getId())).thenAnswer(i->{
//
//            return i;
//
//        });
//        UserCommentReqDto userCommentReqDto = UserCommentReqDto.builder()
//                .content("테스트 댓글")
//                .userId(user.getId())
//                .build();
//
//        UserCommentDto result = commentService.addUserComment(userCommentReqDto,userDetails);
//
//        assertEquals(result.getUserId(),user.getId());
//
//    }
//
//
//    @DisplayName("유저 프로필 댓글 좋아요 성공")
//    @Test
//    void When_Like_UserComment_Success(){
//        when(userCommentRepository.findById(anyLong())).thenReturn(ofNullable(userComment));
//        when(userRepository.findByName(anyString())).thenReturn(ofNullable(user));
//        when(userCommentLikingRepository.save(any(UserCommentLiking.class))).then(I->{
//            UserCommentLiking u = I.getArgument(0,UserCommentLiking.class);
//            return u;
//        });
//
//        commentService.doUserCommentLiking(userDetails,1L);
//
//        verify(userCommentLikingRepository).save(any(UserCommentLiking.class));
//
//    }



    @DisplayName("유저 댓글 수정 테스트: 부모 댓글인 경우")
    @Test
    void Given_Updated_CommentReq_With_ParentId_is_Root(){

        when()

    }



}
