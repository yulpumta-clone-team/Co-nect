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

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> key = createNumber("key", Integer.class);

    public final StringPath value = createString("value");

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

