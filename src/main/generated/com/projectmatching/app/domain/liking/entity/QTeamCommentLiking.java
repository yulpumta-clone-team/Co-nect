package com.projectmatching.app.domain.liking.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamCommentLiking is a Querydsl query type for TeamCommentLiking
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeamCommentLiking extends EntityPathBase<TeamCommentLiking> {

    private static final long serialVersionUID = -1656478259L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamCommentLiking teamCommentLiking = new QTeamCommentLiking("teamCommentLiking");

    public final com.projectmatching.app.domain.QBaseTimeEntity _super = new com.projectmatching.app.domain.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final StringPath status = _super.status;

    public final com.projectmatching.app.domain.comment.entity.QTeamComment teamComment;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.projectmatching.app.domain.user.entity.QUser user;

    public QTeamCommentLiking(String variable) {
        this(TeamCommentLiking.class, forVariable(variable), INITS);
    }

    public QTeamCommentLiking(Path<? extends TeamCommentLiking> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamCommentLiking(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamCommentLiking(PathMetadata metadata, PathInits inits) {
        this(TeamCommentLiking.class, metadata, inits);
    }

    public QTeamCommentLiking(Class<? extends TeamCommentLiking> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.teamComment = inits.isInitialized("teamComment") ? new com.projectmatching.app.domain.comment.entity.QTeamComment(forProperty("teamComment"), inits.get("teamComment")) : null;
        this.user = inits.isInitialized("user") ? new com.projectmatching.app.domain.user.entity.QUser(forProperty("user")) : null;
    }

}

