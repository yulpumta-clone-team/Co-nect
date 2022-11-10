package com.projectmatching.app.domain.liking.repository;

import com.projectmatching.app.domain.liking.entity.QTeamCommentLiking;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.projectmatching.app.domain.liking.entity.QTeamCommentLiking.teamCommentLiking;

@Repository
@RequiredArgsConstructor
public class QTeamCommentLikingRepository {
    private final JPAQueryFactory jpaQueryFactory;


    public boolean isExistWithUserIdAndCommentId(Long userId, Long commentId){
        return jpaQueryFactory.selectOne().from(teamCommentLiking)
                .where(teamCommentLiking.user.id.eq(userId).and(teamCommentLiking.teamComment.id.eq(commentId)))
                .fetchFirst() != null;

    }
}
