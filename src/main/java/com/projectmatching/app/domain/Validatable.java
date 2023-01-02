package com.projectmatching.app.domain;

import com.projectmatching.app.domain.user.UserRepository;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 프로퍼티의 검증을 필요로 하는 메소드에 구현할 것
 */
public interface Validatable {
    void validate();
}