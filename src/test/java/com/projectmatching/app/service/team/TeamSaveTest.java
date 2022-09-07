package com.projectmatching.app.service.team;

import com.projectmatching.app.domain.team.dto.TeamRequestDto;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import static org.mockito.Mockito.when;


public class TeamSaveTest extends ServiceTest {

    @InjectMocks
    private TeamService teamService;

    @Mock
    private UserRepository userRepository;

    @Test
    @DisplayName("생성 실패 : 해당 유저 정보 없으면 팀 게시물 생성 실패")
    void GIVEN_NO_USERDETAILS_TEHN_FAIL(){
        UserDetailsImpl userDetails = UserDetailsImpl.builder()
                .id(123456789L)
                .email("yesman@naver.com")
                .name("yesman")
                .build();
        TeamRequestDto teamRequestDto = TeamRequestDto.builder()
                .content("테스트 팅")
                .name("테스트 팀 이름")
                .build();
        when(userRepository.findById(userDetails.getUserId())).thenThrow(CoNectNotFoundException.class);

        Assertions.assertThrows(CoNectNotFoundException.class,()->{
            teamService.TeamSave(teamRequestDto,userDetails);
        });

    }


}
