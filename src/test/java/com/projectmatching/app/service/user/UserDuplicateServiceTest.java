package com.projectmatching.app.service.user;

import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.service.user.Impl.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UserDuplicateServiceTest extends ServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @DisplayName("중복 이메일 입력시 true 반환 체크 테스트")
    @Test
    void GIVEN_DUPLICATE_USER_EMAIL_THEN_TRUE(){

        String email = "123@naver.com";
        when(userRepository.existsByEmail(anyString())).thenReturn(true);
        assertEquals(true,userService.isDuplicateEmail(email));

    }


    @DisplayName("중복 닉네임 입력시 true 반환 체크 테스트")
    @Test
    void GIVEN_DUPLICATE_USER_NAME_THEN_TRUE(){
        String name = "hyun";
        when(userRepository.existsByName(anyString())).thenReturn(true);

        assertEquals(true,userService.isDuplicateName(name));
    }

}
