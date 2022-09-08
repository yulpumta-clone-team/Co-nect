package com.projectmatching.app.service.team;

import com.projectmatching.app.domain.team.dto.TeamRequestDto;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.techStack.entity.TechCode;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.domain.techStack.provider.TechStackProvider;
import com.projectmatching.app.domain.techStack.provider.TechStackProviderImpl;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@DisplayName("팀 업데이트 테스트")
public class TeamUpdateTest extends TeamServiceTest{

    @Mock
    private TechStackProviderImpl techStackProvider;

    private TeamRequestDto teamRequestDto;


    @BeforeEach
    void setUp(){
        teamRequestDto = TeamRequestDto.builder()
                .skills(new ArrayList<Integer>(){
                    {
                        add(301);
                        add(501);
                    }
                })
                .build();
    }

    @DisplayName("성공 : 팀 업데이트 성공")
    @Test
    void Given_User_And_Team_Success_Update(){

        User user = User.builder()
                .id(1234567890L)
                .name("yesman")
                .email("yesman@naver.com")
                .build();

        UserDetailsImpl userDetails = new UserDetailsImpl(user);

        Team team = Team.builder()
                .id(user.getId())
                .ownerId(12387581239L)
                .name("YesMan's team")
                .content("yesMan의 팀 구합니다")
                .ownerId(user.getId()) //팀 게시자 아이디가 다름
                .build();

        Set<TeamTech> teamTechSet = new HashSet<>();

        teamTechSet.add(teamTechFactory(team));



        when(teamRepository.findById(team.getId())).thenReturn(Optional.of(team));
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));


        teamService.update(team.getId(),teamRequestDto,userDetails);




    }




    private TeamTech teamTechFactory(Team team){
        TechStack techStack = TechStack.builder()
                .keys(101)
                .category("front")
                .techName("react")
                .build();

       return TeamTech.of(techStack,team);

    }

}
