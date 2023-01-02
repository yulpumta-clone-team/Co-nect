package com.projectmatching.app.constant;

public class FilterPatternConstant {


    //필터 제외할 url 모음
    public static String[] pathArray = new String[]{
            "/user/checkDuplicate/*",
            "/user/{id:\\d+}",
            "/user",
            "/user/join",
            "/user/login",
            "/upload/*",
            "/techstack/*",


    };
}
