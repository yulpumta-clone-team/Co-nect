package com.projectmatching.app.service.history;

import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;

import java.util.List;

public interface TeamHistoryService {
    //팀 게시글 조회 이력 저장 서비스
    Long savedTeamHistory(UserDetailsImpl userDetails, Long visitedTeamId);

    //팀 게시글 조회 이력 열람 서비스
    List<Team> getTeamHistory(UserDetailsImpl userDetails);
}
