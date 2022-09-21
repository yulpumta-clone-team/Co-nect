package com.projectmatching.app.service.team;

import com.projectmatching.app.domain.common.Paging;
import com.projectmatching.app.domain.team.dto.TeamDto;
import com.projectmatching.app.domain.team.dto.TeamSimpleDto;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.techStack.provider.TechStackProviderImpl;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectLogicalException;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.ServiceTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.projectmatching.app.constant.ServiceConstant.PAGING_SIZE;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@DisplayName("팀 카드 조회 테스트")
public class TeamReadTest extends TeamServiceTest {



    @DisplayName("성공 : 팀 간략 조회 테스트 성공")
    @Test
    void Given_PageRequest_Then_Return_teamList(){

        Paging paging = new Paging(0,PAGING_SIZE);
        User user = User.builder()
                .id(1234567890L)
                .name("yesman")
                .build();
        Team team = Team.builder()
                .id(3614859819L)
                .ownerId(user.getId())
                .content("testTeam")
                .build();
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        when(teamRepository.getTeams(paging)).thenReturn(new ArrayList<Team>(){
            {
                add(team);
            }

        });


        List<TeamSimpleDto> teamSimpleDtos = teamService.getTeamSimples(paging);



        //하나의 팀 조회됨
        assertEquals(1,teamSimpleDtos.size());

    }

    @DisplayName("실패 : 해당 팀 공고를 작성한 유저 정보 없어서 실패")
    @Test
    void Given_No_Team_Owner_Id_Then_Throw_LogicalException(){
        Paging paging = new Paging(0,PAGING_SIZE);
        Team team = Team.builder()
                .id(3614859819L)
                .ownerId(123456789L)
                .content("testTeam")
                .build();

        when(teamRepository.getTeams(paging)).thenReturn(new ArrayList<Team>(){
            {
                add(team);
            }
        });

        when(userRepository.findById(anyLong())).thenThrow(CoNectLogicalException.class);

        assertThrows(CoNectLogicalException.class,()->{
            teamService.getTeamSimples(paging);
        });
    }



    @DisplayName("성공 : 팀 게시물 상세 조회")
    @Test
    void Given_Team_Id_Then_Return_Team_Dto(){
        Team team = Team.builder()
                .id(3614859819L)
                .ownerId(123456789L)
                .content("testTeam")
                .build();

        User user = User.builder()
                .id(team.getOwnerId())
                .build();

        when(teamRepository.findById(team.getId())).thenReturn(Optional.of(team));
        when(userRepository.findById(team.getOwnerId())).thenReturn(Optional.of(user));
        TeamDto resultTeam = teamService.getTeam(team.getId());

        assertEquals(team.getId(),resultTeam.getId());


    }

    @DisplayName("실패 : 해당 아이디를 가진 팀이 없으므로 팀 게시물 상세조회 실패")
    @Test
    void Given_Invalid_Id_Then_Throw_NotFoundExecption(){

        when(teamRepository.findById(anyLong())).thenThrow(CoNectNotFoundException.class);

        assertThrows(CoNectNotFoundException.class,()->{
            teamService.getTeam(12312467L);
        });
    }
}
