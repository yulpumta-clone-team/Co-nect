package com.projectmatching.app.domain.liking.repository;

import com.projectmatching.app.domain.liking.entity.UserLiking;
import com.projectmatching.app.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserLikingRepository extends JpaRepository<UserLiking,Long> {


    @Query("SELECT u from UserLiking u where u.fromUser.email = :email")
    List<UserLiking> getLikedUserByUserEmail(@Param(value = "email") String email);

    List<UserLiking> findUserLikingByFromUser(User fromUser);

    @Query("SELECT u from UserLiking u where u.fromUser.id = :userId AND u.toUser.id = :targetUserId")
    Optional<UserLiking> findByUserAndTargetUser(@Param(value = "userId") Long userId, @Param(value = "targetUserId") Long targetUserId);

}
