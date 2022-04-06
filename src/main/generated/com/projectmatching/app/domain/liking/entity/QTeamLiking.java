package com.projectmatching.app.domain.liking.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamLiking is a Querydsl query type for TeamLiking
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeamLiking extends EntityPathBase<TeamLiking> {

    private static final long serialVersionUID = -1210393638L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamLiking teamLiking = new QTeamLiking("teamLiking");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.projectmatching.app.domain.team.entity.QTeam team;

    public final com.projectmatching.app.domain.user.entity.QUser user;

    public QTeamLiking(String variable) {
        this(TeamLiking.class, forVariable(variable), INITS);
    }

    public QTeamLiking(Path<? extends TeamLiking> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamLiking(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamLiking(PathMetadata metadata, PathInits inits) {
        this(TeamLiking.class, metadata, inits);
    }

    public QTeamLiking(Class<? extends TeamLiking> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.team = inits.isInitialized("team") ? new com.projectmatching.app.domain.team.entity.QTeam(forProperty("team")) : null;
        this.user = inits.isInitialized("user") ? new com.projectmatching.app.domain.user.entity.QUser(forProperty("user")) : null;
    }

}

