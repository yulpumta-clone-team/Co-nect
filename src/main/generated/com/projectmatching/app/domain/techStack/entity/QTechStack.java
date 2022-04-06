package com.projectmatching.app.domain.techStack.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTechStack is a Querydsl query type for TechStack
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTechStack extends EntityPathBase<TechStack> {

    private static final long serialVersionUID = -482148773L;

    public static final QTechStack techStack = new QTechStack("techStack");

    public final StringPath category = createString("category");

    public final StringPath name = createString("name");

    public final SetPath<com.projectmatching.app.domain.team.entity.TeamTech, com.projectmatching.app.domain.team.entity.QTeamTech> teamTechs = this.<com.projectmatching.app.domain.team.entity.TeamTech, com.projectmatching.app.domain.team.entity.QTeamTech>createSet("teamTechs", com.projectmatching.app.domain.team.entity.TeamTech.class, com.projectmatching.app.domain.team.entity.QTeamTech.class, PathInits.DIRECT2);

    public final NumberPath<Long> techStackId = createNumber("techStackId", Long.class);

    public final SetPath<com.projectmatching.app.domain.user.entity.UserTech, com.projectmatching.app.domain.user.entity.QUserTech> userTeches = this.<com.projectmatching.app.domain.user.entity.UserTech, com.projectmatching.app.domain.user.entity.QUserTech>createSet("userTeches", com.projectmatching.app.domain.user.entity.UserTech.class, com.projectmatching.app.domain.user.entity.QUserTech.class, PathInits.DIRECT2);

    public QTechStack(String variable) {
        super(TechStack.class, forVariable(variable));
    }

    public QTechStack(Path<? extends TechStack> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTechStack(PathMetadata metadata) {
        super(TechStack.class, metadata);
    }

}

