package com.projectmatching.app.constant.techCode;

import com.projectmatching.app.constant.TechStackConstant;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum FrontStack {

    JAVASCRIPT(100,"javascript"),
    REACT(101,"react"),
    VUE(102,"vue"),
    ANGULAR(103,"angular"),
    SVELTE(104,"svelte"),
    TYPESCRIPT(105,"typescript"),
    NEXTJS(106,"nextJs");

    private final int key;
    private final String value;
}
