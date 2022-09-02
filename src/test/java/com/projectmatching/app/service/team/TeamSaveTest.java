package com.projectmatching.app.service.team;

import com.projectmatching.app.service.ServiceTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;


public class TeamSaveTest extends ServiceTest {

    @InjectMocks
    private TeamService teamService;

    @Test
    @DisplayName("생성 실패 : 해당 유저 정보 없으면 팀 게시물 생성 실패")
    void GIVEN_NO_USERDETAILS_TEHN_FAIL(){


    }
}
