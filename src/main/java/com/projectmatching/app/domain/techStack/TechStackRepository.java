package com.projectmatching.app.domain.techStack;

import com.projectmatching.app.domain.techStack.entity.TechCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TechStackRepository extends JpaRepository<TechCode, Long> {
    Optional<TechCode> findByName(String name);
    Optional<TechCode> findByTechSerialNum(Long num);
}
