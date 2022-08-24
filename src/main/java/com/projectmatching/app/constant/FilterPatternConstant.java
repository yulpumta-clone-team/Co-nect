package com.projectmatching.app.constant;

public class FilterPatternConstant {


    private static String servletContext="/api";
    //필터 제외할 url 모음
    public static String[] pathArray = new String[]{
            "/user/",
            "/user/checkDuplicate/**",
            "/user/{\\d+}",
            "/user/join",
            "/user/login",
            "/team",
            "/team/{\\d+}",
            "/user/comment/{\\d+}",
            "/upload/**",
            "/techstack/**",

    };
}
