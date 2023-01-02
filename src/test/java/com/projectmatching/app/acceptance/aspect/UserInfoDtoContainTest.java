//package com.projectmatching.app.acceptance.aspect;
//
//import com.projectmatching.app.acceptance.AcceptanceTest;
//import com.projectmatching.app.domain.comment.dto.UserCommentDto;
//import com.projectmatching.app.domain.comment.dto.UserCommentReqDto;
//import com.projectmatching.app.domain.comment.entity.UserComment;
//import com.projectmatching.app.domain.comment.repository.UserCommentRepository;
//import com.projectmatching.app.domain.user.Role;
//import com.projectmatching.app.domain.user.UserRepository;
//import com.projectmatching.app.domain.user.entity.User;
//import com.projectmatching.app.service.comment.CommentService;
//import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.boot.test.mock.mockito.SpyBean;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.test.annotation.Rollback;
//
//import java.util.Optional;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.doReturn;
//import static org.mockito.Mockito.when;
//
//public class UserInfoDtoContainTest extends AcceptanceTest {
//
//
//    @Autowired
//    private CommentService commentService;
//
//    @Autowired
//    private UserRepository userRepository;
//
//
//
//
//    @Test
//    @Rollback
//    @DisplayName("UserInfoAspect 작동 확인 테스트")
//    void aspectTest(){
//
//        //Given
//        User user = User.builder()
//                .id(123123123123L)
//                .name("testMan")
//                .build();
//
//        User subjectUser = User.builder()
//                .id(12312311113L)
//                .name("subjectUser")
//                .role(Role.USER)
//                .build();
//        UserDetailsImpl userDetails = UserDetailsImpl
//                .builder()
//                .id(12312311113L)
//                .name("subjectUser")
//                .role(Role.USER)
//                .build();
//
//
//
//        UserCommentReqDto userCommentReqDto = UserCommentReqDto.builder()
//                .userId(123123123123L)
//                .content("name")
//                .parentId(null)
//                .build();
//
//        SecurityContextHolder.getContext().setAuthentication( new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities()));
//        user.getUserTeams().clear();
//        userRepository.save(user);
//        userRepository.save(subjectUser);
//
//
//
//
//        UserCommentDto result = commentService.addUserComment(userCommentReqDto,userDetails);
//
//        Assertions.assertEquals(result.getUserInfo().getName(),subjectUser.getName());
//    }
//}
