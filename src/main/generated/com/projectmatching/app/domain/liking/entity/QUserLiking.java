package com.projectmatching.app.domain.liking.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserLiking is a Querydsl query type for UserLiking
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserLiking extends EntityPathBase<UserLiking> {

    private static final long serialVersionUID = 1877359304L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserLiking userLiking = new QUserLiking("userLiking");

    public final com.projectmatching.app.domain.QBaseTimeEntity _super = new com.projectmatching.app.domain.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final com.projectmatching.app.domain.user.entity.QUser fromUser;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final StringPath status = _super.status;

    public final com.projectmatching.app.domain.user.entity.QUser toUser;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QUserLiking(String variable) {
        this(UserLiking.class, forVariable(variable), INITS);
    }

    public QUserLiking(Path<? extends UserLiking> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserLiking(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserLiking(PathMetadata metadata, PathInits inits) {
        this(UserLiking.class, metadata, inits);
    }

    public QUserLiking(Class<? extends UserLiking> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.fromUser = inits.isInitialized("fromUser") ? new com.projectmatching.app.domain.user.entity.QUser(forProperty("fromUser")) : null;
        this.toUser = inits.isInitialized("toUser") ? new com.projectmatching.app.domain.user.entity.QUser(forProperty("toUser")) : null;
    }

}

