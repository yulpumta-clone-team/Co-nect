package com.projectmatching.app.domain.comment.repository;

import com.projectmatching.app.domain.comment.entity.UserComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCommentRepository  extends JpaRepository< UserComment,Long> {

    @Query("SELECT u from UserComment u where u.user.id = :postId")
    List<UserComment> getUserCommentByPostId(@Param(value = "postId")Long postId);

}
