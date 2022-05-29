package com.projectmatching.app.domain.liking.repository;

import com.projectmatching.app.domain.liking.entity.TeamCommentLiking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamCommentLikingRepository extends JpaRepository<TeamCommentLiking, Long> {
    Optional<TeamCommentLiking> findByUser_IdAndTeamComment_Id(Long userId, Long teamCommentId);
}
