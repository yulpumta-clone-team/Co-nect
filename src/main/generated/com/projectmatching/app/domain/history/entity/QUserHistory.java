package com.projectmatching.app.domain.history.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserHistory is a Querydsl query type for UserHistory
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserHistory extends EntityPathBase<UserHistory> {

    private static final long serialVersionUID = 558748816L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserHistory userHistory = new QUserHistory("userHistory");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.projectmatching.app.domain.user.entity.QUser user;

    public final NumberPath<Long> visited = createNumber("visited", Long.class);

    public QUserHistory(String variable) {
        this(UserHistory.class, forVariable(variable), INITS);
    }

    public QUserHistory(Path<? extends UserHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserHistory(PathMetadata metadata, PathInits inits) {
        this(UserHistory.class, metadata, inits);
    }

    public QUserHistory(Class<? extends UserHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.projectmatching.app.domain.user.entity.QUser(forProperty("user")) : null;
    }

}

