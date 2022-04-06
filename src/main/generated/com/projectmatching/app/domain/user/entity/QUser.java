package com.projectmatching.app.domain.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -192712757L;

    public static final QUser user = new QUser("user");

    public final com.projectmatching.app.domain.QBaseTimeEntity _super = new com.projectmatching.app.domain.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath email = createString("email");

    public final StringPath hope_session = createString("hope_session");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath img = createString("img");

    public final StringPath job = createString("job");

    public final StringPath name = createString("name");

    public final StringPath oauthId = createString("oauthId");

    public final StringPath portfolio = createString("portfolio");

    public final StringPath pwd = createString("pwd");

    public final NumberPath<Integer> respected = createNumber("respected", Integer.class);

    public final EnumPath<com.projectmatching.app.domain.user.Role> role = createEnum("role", com.projectmatching.app.domain.user.Role.class);

    public final SetPath<UserTech, QUserTech> skills = this.<UserTech, QUserTech>createSet("skills", UserTech.class, QUserTech.class, PathInits.DIRECT2);

    public final StringPath slogan = createString("slogan");

    //inherited
    public final StringPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final SetPath<com.projectmatching.app.domain.liking.entity.UserCommentLiking, com.projectmatching.app.domain.liking.entity.QUserCommentLiking> userCommentLikings = this.<com.projectmatching.app.domain.liking.entity.UserCommentLiking, com.projectmatching.app.domain.liking.entity.QUserCommentLiking>createSet("userCommentLikings", com.projectmatching.app.domain.liking.entity.UserCommentLiking.class, com.projectmatching.app.domain.liking.entity.QUserCommentLiking.class, PathInits.DIRECT2);

    public final SetPath<com.projectmatching.app.domain.comment.entity.UserComment, com.projectmatching.app.domain.comment.entity.QUserComment> userComments = this.<com.projectmatching.app.domain.comment.entity.UserComment, com.projectmatching.app.domain.comment.entity.QUserComment>createSet("userComments", com.projectmatching.app.domain.comment.entity.UserComment.class, com.projectmatching.app.domain.comment.entity.QUserComment.class, PathInits.DIRECT2);

    public final SetPath<com.projectmatching.app.domain.liking.entity.UserLiking, com.projectmatching.app.domain.liking.entity.QUserLiking> userLikings = this.<com.projectmatching.app.domain.liking.entity.UserLiking, com.projectmatching.app.domain.liking.entity.QUserLiking>createSet("userLikings", com.projectmatching.app.domain.liking.entity.UserLiking.class, com.projectmatching.app.domain.liking.entity.QUserLiking.class, PathInits.DIRECT2);

    public final SetPath<com.projectmatching.app.domain.liking.entity.UserLiking, com.projectmatching.app.domain.liking.entity.QUserLiking> whoLikedMe = this.<com.projectmatching.app.domain.liking.entity.UserLiking, com.projectmatching.app.domain.liking.entity.QUserLiking>createSet("whoLikedMe", com.projectmatching.app.domain.liking.entity.UserLiking.class, com.projectmatching.app.domain.liking.entity.QUserLiking.class, PathInits.DIRECT2);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

