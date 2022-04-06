package com.projectmatching.app.domain.user;

import com.projectmatching.app.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByOauthId(String id);

    Optional<User> findByEmail(String email);

    Optional<User> findByName(String name);

    void deleteUserByEmail(String email);


    boolean existsByEmail(String email);
    boolean existsByName(String name);


}
