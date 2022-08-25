package com.projectmatching.app.domain.techStack.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QTechCode is a Querydsl query type for TechCode
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTechCode extends EntityPathBase<TechCode> {

    private static final long serialVersionUID = 1785080762L;

    public static final QTechCode techCode = new QTechCode("techCode");

    public final com.projectmatching.app.domain.QBaseTimeEntity _super = new com.projectmatching.app.domain.QBaseTimeEntity(this);

    public final StringPath category = createString("category");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final NumberPath<Integer> keys = createNumber("keys", Integer.class);

    //inherited
    public final StringPath status = _super.status;

    public final StringPath techName = createString("techName");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QTechCode(String variable) {
        super(TechCode.class, forVariable(variable));
    }

    public QTechCode(Path<? extends TechCode> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTechCode(PathMetadata metadata) {
        super(TechCode.class, metadata);
    }

}

