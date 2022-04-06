package com.projectmatching.app.domain.liking.repository;

import com.projectmatching.app.domain.liking.entity.TeamCommentLiking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamCommentLikingRepository extends JpaRepository<TeamCommentLiking, Long> {
    boolean existsByUser_IdAndTeamComment_Id(Long userId, Long teamCommentId);
    void deleteByUser_IdAndTeamComment_Id(Long userId, Long teamCommentId);
}
