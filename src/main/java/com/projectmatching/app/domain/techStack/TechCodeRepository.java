package com.projectmatching.app.domain.techStack;

import com.projectmatching.app.domain.techStack.entity.TechCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechCodeRepository extends JpaRepository<TechCode,Long> {

    @Query("SELECT t FROM TechCode t ")
    List<TechCode> find();
}
