package com.projectmatching.app.domain.history;

import com.projectmatching.app.domain.history.entity.UserHistory;
import com.projectmatching.app.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserHisotryRepository extends JpaRepository<UserHistory,Long> {

    List<UserHistory> findUserHistoryByUser(User user);
}
