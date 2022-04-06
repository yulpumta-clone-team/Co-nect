package com.projectmatching.app.domain.liking.repository;

import com.projectmatching.app.domain.liking.entity.TeamLiking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamLikingRepository extends JpaRepository<TeamLiking, Long> {
    boolean existsByUser_IdAndTeam_Id(Long user_id, Long team_id);
    void deleteByUser_IdAndTeam_Id(Long user_id, Long team_id);
}
