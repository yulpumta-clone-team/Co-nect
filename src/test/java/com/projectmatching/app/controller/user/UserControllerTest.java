package com.projectmatching.app.controller.user;

import com.projectmatching.app.controller.ControllerTest;
import com.projectmatching.app.domain.liking.repository.UserLikingRepository;
import com.projectmatching.app.domain.user.QUserRepository;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserJoinDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.user.UserService;
import com.projectmatching.app.util.JsonUtil;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest extends ControllerTest {

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private QUserRepository qUserRepository;

    @MockBean
    private UserLikingRepository userLikingRepository;


    @MockBean
    private PasswordEncoder passwordEncoder;


    private UserJoinDto userJoinDto;

    @MockBean
    private UserService userService;



    @DisplayName("유저 회원가입 요청 테스트")
    @Test
    void UserJoinTest() throws Exception {

        //given
        UserJoinDto userJoinDto = UserJoinDto.builder()
                .name("jason")
                .job("학생")
                .content("나의 각오")
                .email("hyun123@naver.com")
                .hope_session("기간 제한 없음")
                .portfolio("깃허브 링크 등")
                .img(null)
                .slogan("나는 할 수 있다")
                .pwd("123@@asjgdjz")
                .skills(new ArrayList<>(Arrays.asList("스프링","리액트","리눅스")))
                .build();

        when(userRepository.save(any(User.class))).thenAnswer(AdditionalAnswers.returnsFirstArg());
        mockMvc.perform(post("/user/join")
                .contentType(MediaType.APPLICATION_JSON)
                .headers(HttpHeaders.EMPTY)
                .content(JsonUtil.asJson(userJoinDto)))
                .andDo(print())
                .andExpect(status().is(HttpStatus.OK.value()))
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("code").value("1000"));

    }


    @DisplayName("유저 회원가입 요청 실패")
    @Test
    void UserJoinFailTest() throws Exception{
        //given
        UserJoinDto userJoinDto = UserJoinDto.builder()
                .name("jason")
                .job("학생")
                .content("나의 각오")
                .email("hyun123@naver.com")
                .hope_session("기간 제한 없음")
                .portfolio("깃허브 링크 등")
                .img(null)
                .slogan("나는 할 수 있다")
                .skills(new ArrayList<>(Arrays.asList("스프링","리액트","리눅스")))
                .build();

        //given
        userJoinDto.setPwd("4172837192387918273918723918732");

        when(userRepository.save(any(User.class))).thenAnswer(AdditionalAnswers.returnsFirstArg());

        mockMvc.perform(post("/user/join")
                .contentType(MediaType.APPLICATION_JSON)
                .headers(HttpHeaders.EMPTY)
                .content(JsonUtil.asJson(userJoinDto)))
                .andDo(print())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(status().is(HttpStatus.BAD_REQUEST.value()))
                .andExpect(jsonPath("code").value("3007"))
                .andExpect(jsonPath("message").value("비밀번호 형식 오류"));
    }


    @DisplayName("유저 좋아요 누르기")
    @Test
    void UserLikingTest(){


    }
}
