package com.projectmatching.app.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserInfoField {
    NAME("name"),
    ID("id"),
    IMG("img");

    private final String field;

    public static UserInfoField[] list = UserInfoField.values();
    public static String getAt(int idx){
        return list[idx].getField();
    }

}
