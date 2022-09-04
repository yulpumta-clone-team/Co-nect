package com.projectmatching.app.service.user;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.techStack.provider.TechStackProviderImpl;
import com.projectmatching.app.domain.user.UserRepository;

import com.projectmatching.app.domain.user.dto.UserEssentialDto;
import com.projectmatching.app.domain.user.dto.UserJoinDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.service.user.Impl.UserSignUpService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class UserSignUpServiceTest extends ServiceTest {

    @InjectMocks
    private UserSignUpService userSignUpService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TechStackProviderImpl techStackProvider;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserDetailsImpl userDetails;

    private UserJoinDto userJoinDto;
    private UserEssentialDto userEssentialDto;



    @Test
    @DisplayName("회원가입 성공")
    void GIVEN_USERJOINDTO_THEN_RETURN_USER_ID(){
        UserJoinDto userJoinDto = UserJoinDto.builder()
                .email("123@naver.com")
                .pwd("bbbaa@g77")
                .build();

        when(passwordEncoder.encode(anyString())).thenReturn("!asdasjdasofogihaoqier!@#!#%a");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Long result = userSignUpService.join(userJoinDto);

        assertEquals(result,userJoinDto.getId());


    }

    @Test
    @DisplayName("유저 이메일 중복으로 회원가입 실패")
    void GIVEN_DUPLICATED_EMAIL_USERJOINDTO_THEN_THROW_EXCEPTION(){
        UserJoinDto userJoinDto = UserJoinDto.builder()
                .email("123@naver.com")
                .pwd("bbbaa@g77")
                .build();


        User user = mock(User.class);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));


        assertThrows(ResponeException.class,()->{
            userSignUpService.join(userJoinDto);
        });


    }

    @Test
    @DisplayName("유저 필수 정보 업데이트 테스트")
    void WHEN_UPDATE_USER_ESSENTIAL_INFO_THEN_SUCEESS(){
        userEssentialDto = UserEssentialDto.builder()
                .content("자기소개")
                .name("yesman")
                .skills(Arrays.asList(100,101))
                .slogan("slogan")
                .image("img")
                .job("무직")
                .hope_session("1개월")
                .build();

        User user = mock(User.class);
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        when(userDetails.getUserId()).thenReturn(anyLong());

        userSignUpService.updateUserEssentialInfo(userEssentialDto,userDetails);

    }

    @Test
    @DisplayName("중복되는 유저 닉네임으로 인해 필수 정보 업데이트 실패 ")
    void WHEN_DUPLICATED_NAME_UPDATE_USER_ESSENTIAL_INFO_THEN_THROW_EXCEPTION(){
        userEssentialDto = UserEssentialDto.builder()
                .content("자기소개")
                .name("yesman")
                .skills(Arrays.asList(100,101))
                .slogan("slogan")
                .image("img")
                .job("무직")
                .hope_session("1개월")
                .build();

        User user = mock(User.class);
        when(userRepository.findByName(anyString())).thenReturn(Optional.of(user)); //중복되는 이름을 갖는 유저
        assertThrows(ResponeException.class,()->{
            userSignUpService.updateUserEssentialInfo(userEssentialDto,userDetails);
        });
    }

}
