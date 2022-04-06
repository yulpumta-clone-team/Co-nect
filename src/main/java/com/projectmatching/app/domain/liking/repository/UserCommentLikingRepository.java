package com.projectmatching.app.domain.liking.repository;

import com.projectmatching.app.domain.liking.entity.UserCommentLiking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCommentLikingRepository extends JpaRepository<UserCommentLiking,Long> {

    @Query("SELECT u FROM UserCommentLiking u WHERE u.user.name = :userName AND u.userComment.id = :commentId")
    Optional<UserCommentLiking> findUserCommentLikingByUserNameAndUserCommentId(@Param(value = "userName")String userName,
                                                             @Param(value = "commentId")Long commentId);

}
