package com.projectmatching.app.constant.techCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum BackStack {
    NODEJS(200,"nodeJs"),
    NESTJS(201,"nestJs"),
    EXPRESS(202,"express"),
    JAVA(203,"java"),
    SPRING(204,"spring"),
    C(205,"C"),
    CPP(206,"C++"),
    CSHARP(207,"C#"),
    PYTHON(208,"python"),
    DJANGO(209,"django"),
    GO(210,"go"),
    PHP(211,"php");

    private final int key;
    private final String value;

}
