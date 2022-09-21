package com.projectmatching.app.service.user;


import com.projectmatching.app.domain.team.dto.TeamSimpleDto;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.service.user.Impl.UserService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;


import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest  extends ServiceTest {


    @InjectMocks
    private UserService userService;

    @Mock
    private TeamRepository teamRepository;

    @Mock
    private UserRepository userRepository;

    @DisplayName("성공 : 토큰 정보로 내가 생성한 팀 공고 조회 성공")
    @Test
    void Given_valid_userDetails_then_Success_Get_TeamList(){

        User user = User.builder().id(1234567890L)
                .name("testUser")
                .email("yesMan@naver.com")
                .build();
        UserDetailsImpl userDetails = UserDetailsImpl.builder()
                .id(user.getId())
                .name("testUser")
                .email("yesMan@naver.com")
                .build();
        Team testTeam = Team.builder()
                .id(1111111111L)
                .content("user's team")
                .ownerId(userDetails.getUserId())
                .build();

        when(userRepository.findById(userDetails.getUserId())).thenReturn(Optional.of(user));
        when(teamRepository.findTeamByOwnerId(userDetails.getUserId())).thenReturn(
                new ArrayList<Team>(Arrays.asList(testTeam))
               );


        List<TeamSimpleDto> resultList = userService.getMyTeamList(userDetails);

        Assertions.assertThat(resultList.get(0).getUserInfo().getId()).isEqualTo(userDetails.getUserId());
        Assertions.assertThat(resultList.size()).isEqualTo(1);

    }


    @DisplayName("실패 : 유저 인증 정보 찾을 수 없음")
    @Test
    void Given_Unvalid_userDetails_then_Failed_Get_TeamList(){

        UserDetailsImpl userDetails = UserDetailsImpl.builder()
                .id(null)
                .build();


        assertThrows(CoNectNotFoundException.class,()->{
            userService.getMyTeamList(userDetails);
        });

    }

}
