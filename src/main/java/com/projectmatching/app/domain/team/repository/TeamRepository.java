package com.projectmatching.app.domain.team.repository;

import com.projectmatching.app.domain.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long>, TeamRepositoryCustom {


    @Query("SELECT t FROM Team t Where t.ownerId = :ownerId")
    List<Team> findTeamByOwnerId(@Param("ownerId") Long ownerId);
}
