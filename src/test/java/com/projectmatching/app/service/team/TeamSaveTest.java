package com.projectmatching.app.service.team;

import com.projectmatching.app.domain.team.dto.TeamRequestDto;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.techStack.provider.TechStackProviderImpl;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;



@DisplayName("팀 생성 테스트")
public class TeamSaveTest extends TeamServiceTest {


    @Test
    @DisplayName("실패 : 해당 유저 정보 없으면 팀 게시물 생성 실패")
    void Given_No_Userdetails_Then_Fail(){
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


    @Test
    @DisplayName("성공 : 팀 게시물 생성 성공")
    void Given_Userdetail_and_TeamRequestDto_then_Success(){
        UserDetailsImpl userDetails = UserDetailsImpl.builder()
                .id(123456789L)
                .email("yesman@naver.com")
                .name("yesman")
                .build();
        TeamRequestDto teamRequestDto = TeamRequestDto.builder()
                .content("테스트 팅")
                .name("테스트 팀 이름")
                .skills(new ArrayList<Integer>(){
                    {
                        add(101);
                        add(201);
                    }
                })
                .build();
        User user = User.builder()
                .id(123456789L)
                .email("yesman@naver.com")
                .name("yesman")
                .build();

        when(userRepository.findById(userDetails.getUserId())).thenReturn(Optional.of(user));
        teamService.TeamSave(teamRequestDto,userDetails);

        verify(teamRepository).save(any(Team.class));
        verify(techStackProvider).extractTechCodeByKeys(any(ArrayList.class));

    }

}
