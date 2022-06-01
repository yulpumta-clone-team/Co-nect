package com.projectmatching.app.domain.liking.repository;

import com.projectmatching.app.domain.liking.entity.TeamLiking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamLikingRepository extends JpaRepository<TeamLiking, Long> {
    boolean existsByUser_IdAndTeam_Id(Long userId, Long teamId);
    void deleteByUser_IdAndTeam_Id(Long userId, Long teamId);

    List<TeamLiking> findTeamLikingByUser_Id(Long userId);
}
