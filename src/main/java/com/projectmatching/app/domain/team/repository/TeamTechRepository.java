package com.projectmatching.app.domain.team.repository;

import com.projectmatching.app.domain.team.entity.TeamTech;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeamTechRepository extends JpaRepository<TeamTech, Long> {
    

}
