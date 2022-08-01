package com.projectmatching.app.domain.history.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamHistory is a Querydsl query type for TeamHistory
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeamHistory extends EntityPathBase<TeamHistory> {

    private static final long serialVersionUID = -672311874L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamHistory teamHistory = new QTeamHistory("teamHistory");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.projectmatching.app.domain.user.entity.QUser user;

    public final NumberPath<Long> visited = createNumber("visited", Long.class);

    public QTeamHistory(String variable) {
        this(TeamHistory.class, forVariable(variable), INITS);
    }

    public QTeamHistory(Path<? extends TeamHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamHistory(PathMetadata metadata, PathInits inits) {
        this(TeamHistory.class, metadata, inits);
    }

    public QTeamHistory(Class<? extends TeamHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.projectmatching.app.domain.user.entity.QUser(forProperty("user")) : null;
    }

}

