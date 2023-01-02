package com.projectmatching.app.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor
public enum TechStackConstant {

    FRONT(1),
    BACK(2),
    MOBILE(3),
    DB(4),
    ARCHITECTURE(5);


    private final int code;



}
