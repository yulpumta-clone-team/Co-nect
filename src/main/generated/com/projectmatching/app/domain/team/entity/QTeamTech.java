package com.projectmatching.app.domain.team.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamTech is a Querydsl query type for TeamTech
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeamTech extends EntityPathBase<TeamTech> {

    private static final long serialVersionUID = 40499493L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamTech teamTech = new QTeamTech("teamTech");

    public final com.projectmatching.app.domain.QBaseTimeEntity _super = new com.projectmatching.app.domain.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final StringPath status = _super.status;

    public final QTeam team;

    public final com.projectmatching.app.domain.techStack.entity.QTechStack techStack;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QTeamTech(String variable) {
        this(TeamTech.class, forVariable(variable), INITS);
    }

    public QTeamTech(Path<? extends TeamTech> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamTech(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamTech(PathMetadata metadata, PathInits inits) {
        this(TeamTech.class, metadata, inits);
    }

    public QTeamTech(Class<? extends TeamTech> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.team = inits.isInitialized("team") ? new QTeam(forProperty("team")) : null;
        this.techStack = inits.isInitialized("techStack") ? new com.projectmatching.app.domain.techStack.entity.QTechStack(forProperty("techStack")) : null;
    }

}

