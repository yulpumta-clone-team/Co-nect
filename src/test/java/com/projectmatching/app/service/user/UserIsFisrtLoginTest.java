package com.projectmatching.app.service.user;

import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserIsFirstDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.service.user.Impl.UserSignInService;
import com.projectmatching.app.service.user.Impl.UserSignUpService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

public class UserIsFisrtLoginTest extends ServiceTest {


    @InjectMocks
    private UserSignInService userSignInService;


    @Mock
    private UserRepository userRepository;

    @Mock
    private UserDetailsImpl userDetails;

    @Test
    @DisplayName("최초 로그인 유저인 경우 UserIsFirst 값 true로 전달")
    void GIVEN_NULL_NICKNAME_USER_THEN_RETURN_ISFIRST_LOGIN_TRUE_DTO(){
        User user = User.builder()
                .email("yesman@naver.com")
                .pwd("!@#!#5682348248692381!@#8536jaxdhas")
                .build();



        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        UserIsFirstDto result = userSignInService.isFirstLoginUserCheck(user.getEmail());

        Assertions.assertTrue(result.getIsFirst());
    }

    @Test
    @DisplayName("최초 로그인 유저가 아닌 경우 UserIsFirst 값 false로 전달")
    void GIVEN_NOT_NULL_NICKNAME_USER_THEN_RETURN_ISFIRST_LOGIN_FALSE_DTO(){
                User user = User.builder()
                .email("yesman@naver.com")
                        .name("yesman")
                .pwd("!@#!#5682348248692381!@#8536jaxdhas")
                .build();
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        UserIsFirstDto result = userSignInService.isFirstLoginUserCheck(user.getEmail());

        Assertions.assertFalse(result.getIsFirst());
    }
}
