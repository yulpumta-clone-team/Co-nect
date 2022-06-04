package com.projectmatching.app.constant.techCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum MobileStack {
    FLUTTER(300,"flutter"),
    REACTNATIVE(301,"reactNative"),
    KOTLIN(302,"kotlin"),
    SWIFT(303,"swift");
    private final int key;
    private final String value;
}
