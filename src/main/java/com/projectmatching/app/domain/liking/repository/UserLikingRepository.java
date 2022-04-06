package com.projectmatching.app.domain.liking.repository;

import com.projectmatching.app.domain.liking.entity.UserLiking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserLikingRepository extends JpaRepository<UserLiking,Long> {


    @Query("SELECT u from UserLiking u where u.fromUser.email = :email")
    List<UserLiking> getLikedUserByUserEmail(@Param(value = "email") String email);
}
