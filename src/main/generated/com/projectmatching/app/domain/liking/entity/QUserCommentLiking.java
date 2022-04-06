package com.projectmatching.app.domain.liking.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserCommentLiking is a Querydsl query type for UserCommentLiking
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserCommentLiking extends EntityPathBase<UserCommentLiking> {

    private static final long serialVersionUID = 346734367L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserCommentLiking userCommentLiking = new QUserCommentLiking("userCommentLiking");

    public final com.projectmatching.app.domain.QBaseTimeEntity _super = new com.projectmatching.app.domain.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final StringPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.projectmatching.app.domain.user.entity.QUser user;

    public final com.projectmatching.app.domain.comment.entity.QUserComment userComment;

    public QUserCommentLiking(String variable) {
        this(UserCommentLiking.class, forVariable(variable), INITS);
    }

    public QUserCommentLiking(Path<? extends UserCommentLiking> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserCommentLiking(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserCommentLiking(PathMetadata metadata, PathInits inits) {
        this(UserCommentLiking.class, metadata, inits);
    }

    public QUserCommentLiking(Class<? extends UserCommentLiking> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.projectmatching.app.domain.user.entity.QUser(forProperty("user")) : null;
        this.userComment = inits.isInitialized("userComment") ? new com.projectmatching.app.domain.comment.entity.QUserComment(forProperty("userComment"), inits.get("userComment")) : null;
    }

}

