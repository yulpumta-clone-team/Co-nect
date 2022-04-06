package com.projectmatching.app.domain.team.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeam is a Querydsl query type for Team
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeam extends EntityPathBase<Team> {

    private static final long serialVersionUID = -118828561L;

    public static final QTeam team = new QTeam("team");

    public final com.projectmatching.app.domain.QBaseTimeEntity _super = new com.projectmatching.app.domain.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath img = createString("img");

    public final StringPath name = createString("name");

    public final NumberPath<Long> read = createNumber("read", Long.class);

    public final StringPath session = createString("session");

    //inherited
    public final StringPath status = _super.status;

    public final NumberPath<Long> team_id = createNumber("team_id", Long.class);

    public final SetPath<com.projectmatching.app.domain.comment.entity.TeamComment, com.projectmatching.app.domain.comment.entity.QTeamComment> teamComments = this.<com.projectmatching.app.domain.comment.entity.TeamComment, com.projectmatching.app.domain.comment.entity.QTeamComment>createSet("teamComments", com.projectmatching.app.domain.comment.entity.TeamComment.class, com.projectmatching.app.domain.comment.entity.QTeamComment.class, PathInits.DIRECT2);

    public final SetPath<TeamTech, QTeamTech> teamTeches = this.<TeamTech, QTeamTech>createSet("teamTeches", TeamTech.class, QTeamTech.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final SetPath<com.projectmatching.app.domain.user.entity.UserTeam, com.projectmatching.app.domain.user.entity.QUserTeam> userTeams = this.<com.projectmatching.app.domain.user.entity.UserTeam, com.projectmatching.app.domain.user.entity.QUserTeam>createSet("userTeams", com.projectmatching.app.domain.user.entity.UserTeam.class, com.projectmatching.app.domain.user.entity.QUserTeam.class, PathInits.DIRECT2);

    public QTeam(String variable) {
        super(Team.class, forVariable(variable));
    }

    public QTeam(Path<? extends Team> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTeam(PathMetadata metadata) {
        super(Team.class, metadata);
    }

}

