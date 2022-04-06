package com.projectmatching.app.domain.comment.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class QUserCommentRepository {
    private final JPAQueryFactory jpaQueryFactory;
}
