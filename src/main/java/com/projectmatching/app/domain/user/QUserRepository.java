package com.projectmatching.app.domain.user;

import com.projectmatching.app.domain.user.dto.UserLoginDto;
import com.projectmatching.app.domain.user.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.projectmatching.app.domain.user.entity.QUser.user;


@Repository
@RequiredArgsConstructor
@Slf4j
public class QUserRepository {

    private final JPAQueryFactory jpaQueryFactory;


    /**
     * 유저 로그인
     */
    public User login(UserLoginDto userLoginDto){

        return jpaQueryFactory.selectFrom(user)
                .where(
                        user.email.eq(userLoginDto.getEmail())
                ).fetchOne();

    }



    /**
     * 유저 탈퇴
     * 완전히 삭제하지는 않고 임시로 상태를 바꾸기
     */

    public long deleteUser(String email){

       return jpaQueryFactory.update(user)
               .set(user.status, "NA")
                .where(
                        user.email.eq(email)
                ).execute();
    }

    /**
     * 유저 카드 (리스트) 표시
     */
    public List<User> find(Pageable pageable){
        return jpaQueryFactory.selectFrom(user)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

    }


    /**
     * 유저 상세 표시
     */
    public Optional<User> find(Long id){
        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(user)
                .where(user.id.eq(id))
                .fetchOne()
        );

    }


    /**
     * 유저 좋아요 누르기
     */




}
