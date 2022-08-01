package com.projectmatching.app.domain.history;

import com.projectmatching.app.domain.history.entity.TeamHistory;
import com.projectmatching.app.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamHistoryRepository extends JpaRepository<TeamHistory, Long> {
    List<TeamHistory> findTeamHistoriesByUser(User user);
}
