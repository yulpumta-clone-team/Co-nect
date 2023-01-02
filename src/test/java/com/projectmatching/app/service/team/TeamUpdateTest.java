package com.projectmatching.app.service.team;

import com.projectmatching.app.constant.bean.TechStackCodeBean;
import com.projectmatching.app.domain.team.dto.TeamRequestDto;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.domain.techStack.provider.TechStackProviderImpl;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.mockito.Mockito.*;

@DisplayName("팀 업데이트 테스트")
@SpringBootTest
public class TeamUpdateTest{


    @Autowired
    private TeamService teamService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private TeamRepository teamRepository;




    @DisplayName("성공 : 팀 업데이트 성공")
    @Test
    @DirtiesContext
    void Given_User_And_Team_Success_Update(){

        User user = User.builder()
                .id(1234567890L)
                .name("yesman")
                .email("yesman@naver.com")
                .build();

        UserDetailsImpl userDetails = new UserDetailsImpl(user);
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

        Team team = Team.builder()
                .id(user.getId())
                .ownerId(12387581239L)
                .name("YesMan's team")
                .content("yesMan의 팀 구합니다")
                .ownerId(user.getId()) //팀 게시자 아이디가 다름
                .build();

        Set<TeamTech> teamTechSet = new HashSet<>();

        teamTechSet.add(teamTechFactory(team));
        team.setTeamTeches(teamTechSet);


        doReturn(Optional.of(team)).when(teamRepository).findById(team.getId());
        doReturn(Optional.of(user)).when(userRepository).findById(user.getId());

        teamService.update(team.getId(),teamRequestDto,userDetails);


        //업데이트 하고자 했던 팀 기술 스택이랑 같아졌는지 확인
        Assertions.assertEquals(teamTechSet,team.getTeamTeches());


    }




    private TeamTech teamTechFactory(Team team){
        TechStack techStack = TechStack.builder()
                .key(101)
                .category("front")
                .techName("react")
                .build();

        return TeamTech.valueOf(techStack,team);

    }

}