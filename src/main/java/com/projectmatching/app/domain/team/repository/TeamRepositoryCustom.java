package com.projectmatching.app.domain.team.repository;

import com.projectmatching.app.domain.team.entity.Team;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepositoryCustom {
    List<Team> getTeams(PageRequest pageRequest);

    void deleteTeam(Long team_id);
}
