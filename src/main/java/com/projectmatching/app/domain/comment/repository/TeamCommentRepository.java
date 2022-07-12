package com.projectmatching.app.domain.comment.repository;

import com.projectmatching.app.domain.comment.entity.TeamComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamCommentRepository extends JpaRepository<TeamComment,Long> {
    List<TeamComment> findAllByTeam_Id(Long teamId);
}
