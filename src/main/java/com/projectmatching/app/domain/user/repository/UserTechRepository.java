package com.projectmatching.app.domain.user.repository;

import com.projectmatching.app.domain.user.entity.UserTech;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTechRepository extends JpaRepository<UserTech,Long> {

}
