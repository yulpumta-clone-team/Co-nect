package com.projectmatching.app.domain.cache;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CacheType {

    TECH_CODE(
            "techCode",
            60*60*5, //만료시간 5시간
            100 //100개 사이즈
    );




    private final String cacheName;
    private final int expireAfterWrite;
    private final int maximumSize;


}
