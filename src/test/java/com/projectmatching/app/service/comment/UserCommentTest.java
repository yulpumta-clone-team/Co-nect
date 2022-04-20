package com.projectmatching.app.service.comment;

import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.domain.comment.entity.UserComment;
import com.projectmatching.app.domain.comment.repository.UserCommentRepository;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.util.IdGenerator;
import org.junit.jupiter.api.*;
import org.mockito.*;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.MockBeans;
import org.springframework.test.context.event.annotation.AfterTestClass;
import org.springframework.test.context.event.annotation.BeforeTestClass;


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
    private UserRepository userRepository;

    @InjectMocks
    private CommentServiceImpl commentService;

    //댓글달리는 대상
    private User user = User.builder().id(1234567890L).email("testing@user.com").content("testUser").build();


    //달 댓글
    private UserCommentDto userCommentDto = UserCommentDto.builder()
            .id(1234567890L).content("테스트 댓글")
            .userId(user.getId())
            .build();



    @BeforeEach
    public void beforeClass(){
        UserCommentDtoStatic = mockStatic(UserCommentDto.class);
        idGenerator = mockStatic(IdGenerator.class);
        when(IdGenerator.number()).thenReturn(1234567890L);
        when(UserCommentDto.of(any(UserComment.class))).then(I->{
            return userCommentDto;
        });
    }

    @AfterEach
    public void afterClass(){
        UserCommentDtoStatic.close();
        idGenerator.close();
        System.out.println("UserComment test Class ended");
    }



    @DisplayName("유저 프로필에 댓글 달기 성공")
    @Test
    void addUserComment_Succeess(){
        when(userRepository.findById(userCommentDto.getUserId())).then(I->{
            return Optional.of(user);
        });
        when(userCommentRepository.save(any(UserComment.class))).then(I-> {
            UserComment userComment = (UserComment) I.getArgument(0);
            return userComment;
        });

        UserCommentDto result = commentService.addUserComment(userCommentDto);

        assertEquals(result.getUserId(),user.getId());
        assertEquals(1234567890L,IdGenerator.number());
    }

}