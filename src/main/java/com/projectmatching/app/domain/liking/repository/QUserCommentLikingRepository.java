package com.projectmatching.app.domain.liking.repository;


import com.projectmatching.app.domain.liking.entity.QUserCommentLiking;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.projectmatching.app.domain.liking.entity.QUserCommentLiking.userCommentLiking;

@Repository
@RequiredArgsConstructor
public class QUserCommentLikingRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public boolean isExistWithUserIdAndCommentId(Long userId, Long commentId){
        return jpaQueryFactory.selectOne().from(userCommentLiking)
                .where(userCommentLiking.user.id.eq(userId).and(userCommentLiking.userComment.id.eq(commentId)))
                .fetchFirst() != null;

    }
}
