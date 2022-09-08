package com.projectmatching.app.service.team;

import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectLogicalException;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TeamDeleteTest extends TeamServiceTest{



    @DisplayName("성공 : 유저가 팀 게시물 삭제 성공")
    @Test
    void Given_User_And_Team_Then_Success_delete_team(){

        UserDetailsImpl userDetails = UserDetailsImpl
                .builder()
                .id(1234567890L)
                .email("yesman@naver.com")
                .build();

        User user = User.builder()
                .id(1234567890L)
                .name("yesman")
                .email("yesman@naver.com")
                .build();


        Team team = Team.builder()
                .id(1237581929L)
                .ownerId(user.getId())
                .name("YesMan's team")
                .content("yesMan의 팀 구합니다")
                .build();

        when(userRepository.findById(userDetails.getUserId())).thenReturn(Optional.of(user));
        when(teamRepository.findById(anyLong())).thenReturn(Optional.of(team));

        teamService.delete(team.getId(),userDetails);

        verify(teamRepository).deleteTeam(team.getId());

    }


    @DisplayName("실패 : 팀 게시물 작성자가 아니면 게시물 삭제 실패")
    @Test
    void Given_Not_Team_Owner_User_Then_Throw_Logical_Exception(){
        UserDetailsImpl userDetails = UserDetailsImpl
                .builder()
                .id(1234567890L)
                .email("yesman@naver.com")
                .build();

        User user = User.builder()
                .id(1234567890L)
                .name("yesman")
                .email("yesman@naver.com")
                .build();

        Team team = Team.builder()
                .id(1237581929L)
                .ownerId(user.getId())
                .name("YesMan's team")
                .content("yesMan의 팀 구합니다")
                .ownerId(1220202022L) //팀 게시자 아이디가 다름
                .build();


        when(userRepository.findById(userDetails.getUserId())).thenReturn(Optional.of(user));
        when(teamRepository.findById(anyLong())).thenReturn(Optional.of(team));


        assertThrows(CoNectLogicalException.class,()->{
            teamService.delete(team.getId(),userDetails);
        });
    }



    @DisplayName("실패 : 유저 정보 없음")
    @Test
    void Given_No_User_Info_Then_Throw_Not_Found_Exception(){
        UserDetailsImpl userDetails = UserDetailsImpl
                .builder()
                .id(1234567890L)
                .email("yesman@naver.com")
                .build();
        User user = User.builder()
                .id(1234567890L)
                .name("yesman")
                .email("yesman@naver.com")
                .build();

        Team team = Team.builder()
                .id(1237581929L)
                .ownerId(user.getId())
                .name("YesMan's team")
                .content("yesMan의 팀 구합니다")
                .ownerId(1220202022L) //팀 게시자 아이디가 다름
                .build();
        when(userRepository.findById(userDetails.getUserId())).thenThrow(CoNectLogicalException.class);

        assertThrows(CoNectLogicalException.class,()->{
            teamService.delete(team.getId(),userDetails);
        });

    }



    @DisplayName("실패 : 팀 정보 없음")
    @Test
    void Given_No_Team_Info_Then_Throw_Not_Found_Exception(){
        UserDetailsImpl userDetails = UserDetailsImpl
                .builder()
                .id(1234567890L)
                .email("yesman@naver.com")
                .build();
        User user = User.builder()
                .id(1234567890L)
                .name("yesman")
                .email("yesman@naver.com")
                .build();

        Team team = Team.builder()
                .id(1237581929L)
                .ownerId(user.getId())
                .name("YesMan's team")
                .content("yesMan의 팀 구합니다")
                .ownerId(1220202022L) //팀 게시자 아이디가 다름
                .build();
        when(userRepository.findById(userDetails.getUserId())).thenReturn(Optional.of(user));
        when(teamRepository.findById(team.getId())).thenThrow(CoNectLogicalException.class);

        assertThrows(CoNectLogicalException.class,()->{
            teamService.delete(team.getId(),userDetails);
        });

    }
}
