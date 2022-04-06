package com.projectmatching.app.domain.team.repository;

import com.projectmatching.app.domain.team.entity.TeamTech;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamTechRepository extends JpaRepository<TeamTech, Long> {
    void deleteAllByTeam_Id(Long teamId);
}
