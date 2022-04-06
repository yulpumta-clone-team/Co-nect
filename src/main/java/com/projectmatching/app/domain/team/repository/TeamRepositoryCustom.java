package com.projectmatching.app.domain.team.repository;

import com.projectmatching.app.domain.team.dto.TeamResponseDto;
import com.projectmatching.app.domain.team.entity.Team;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface TeamRepositoryCustom {
    List<Team> getTeams(PageRequest pageRequest);
    void deleteTeam(Long team_id);
}
