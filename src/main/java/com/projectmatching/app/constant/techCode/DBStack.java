package com.projectmatching.app.constant.techCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum DBStack {

    MYSQL(400,"mysql"),
    H2(401,"h2"),
    MONGODB(402,"mongodb"),
    ORACLE(403,"oracle");

    private final int key;
    private final String value;
}
