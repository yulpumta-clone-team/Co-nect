package com.projectmatching.app.domain.user;

import com.projectmatching.app.domain.user.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam,Long> {
}
