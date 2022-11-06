package com.projectmatching.app.domain.liking.repository;

import com.projectmatching.app.domain.liking.entity.TeamCommentLiking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamCommentLikingRepository extends JpaRepository<TeamCommentLiking, Long> {
    Optional<TeamCommentLiking> findByUserIdAndTeamCommentId(Long userId, Long teamCommentId);


}
