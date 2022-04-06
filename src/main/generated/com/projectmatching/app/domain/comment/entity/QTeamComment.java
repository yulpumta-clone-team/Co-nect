package com.projectmatching.app.domain.comment.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamComment is a Querydsl query type for TeamComment
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeamComment extends EntityPathBase<TeamComment> {

    private static final long serialVersionUID = 766942L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamComment teamComment = new QTeamComment("teamComment");

    public final com.projectmatching.app.domain.QBaseTimeEntity _super = new com.projectmatching.app.domain.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> parentId = createNumber("parentId", Long.class);

    public final BooleanPath secret = createBoolean("secret");

    //inherited
    public final StringPath status = _super.status;

    public final com.projectmatching.app.domain.team.entity.QTeam team;

    public final SetPath<com.projectmatching.app.domain.liking.entity.TeamCommentLiking, com.projectmatching.app.domain.liking.entity.QTeamCommentLiking> teamCommentLikings = this.<com.projectmatching.app.domain.liking.entity.TeamCommentLiking, com.projectmatching.app.domain.liking.entity.QTeamCommentLiking>createSet("teamCommentLikings", com.projectmatching.app.domain.liking.entity.TeamCommentLiking.class, com.projectmatching.app.domain.liking.entity.QTeamCommentLiking.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QTeamComment(String variable) {
        this(TeamComment.class, forVariable(variable), INITS);
    }

    public QTeamComment(Path<? extends TeamComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamComment(PathMetadata metadata, PathInits inits) {
        this(TeamComment.class, metadata, inits);
    }

    public QTeamComment(Class<? extends TeamComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.team = inits.isInitialized("team") ? new com.projectmatching.app.domain.team.entity.QTeam(forProperty("team")) : null;
    }

}

