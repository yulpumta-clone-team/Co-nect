package com.projectmatching.app.domain.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserTeam is a Querydsl query type for UserTeam
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserTeam extends EntityPathBase<UserTeam> {

    private static final long serialVersionUID = 579356872L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserTeam userTeam = new QUserTeam("userTeam");

    public final com.projectmatching.app.domain.QBaseTimeEntity _super = new com.projectmatching.app.domain.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final StringPath status = _super.status;

    public final com.projectmatching.app.domain.team.entity.QTeam team;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final QUser user;

    public QUserTeam(String variable) {
        this(UserTeam.class, forVariable(variable), INITS);
    }

    public QUserTeam(Path<? extends UserTeam> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserTeam(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserTeam(PathMetadata metadata, PathInits inits) {
        this(UserTeam.class, metadata, inits);
    }

    public QUserTeam(Class<? extends UserTeam> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.team = inits.isInitialized("team") ? new com.projectmatching.app.domain.team.entity.QTeam(forProperty("team")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

