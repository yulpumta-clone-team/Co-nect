package com.projectmatching.app.domain.techStack;

import com.projectmatching.app.domain.techStack.entity.TechStack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TechStackRepository extends JpaRepository<TechStack, Long> {

}
