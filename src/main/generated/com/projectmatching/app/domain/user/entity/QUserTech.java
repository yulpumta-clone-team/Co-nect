package com.projectmatching.app.domain.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserTech is a Querydsl query type for UserTech
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserTech extends EntityPathBase<UserTech> {

    private static final long serialVersionUID = 579356929L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserTech userTech = new QUserTech("userTech");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.projectmatching.app.domain.techStack.entity.QTechStack techStack;

    public final QUser user;

    public QUserTech(String variable) {
        this(UserTech.class, forVariable(variable), INITS);
    }

    public QUserTech(Path<? extends UserTech> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserTech(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserTech(PathMetadata metadata, PathInits inits) {
        this(UserTech.class, metadata, inits);
    }

    public QUserTech(Class<? extends UserTech> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.techStack = inits.isInitialized("techStack") ? new com.projectmatching.app.domain.techStack.entity.QTechStack(forProperty("techStack")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

