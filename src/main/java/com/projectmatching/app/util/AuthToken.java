package com.projectmatching.app.util;

import com.projectmatching.app.constant.JwtConstant;
import io.jsonwebtoken.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.security.Key;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Getter
@Builder
public class AuthToken {

    private final String token;
    private final String refreshToken;


    public static AuthToken of(String token,String refreshToken){
        return new AuthToken(token,refreshToken);
    }

    public MultiValueMap<String,String> asMultiValueMap(){
        MultiValueMap<String,String> map = new LinkedMultiValueMap<>();
        map.add(JwtConstant.HEADER_NAME,token);
        map.add(JwtConstant.REFRESH_TOKEN_HEADER_NAME,refreshToken);
        return map;

    }

    //헤더에 토큰 추가
    public HttpHeaders asHeaders() {return new HttpHeaders(asMultiValueMap());}


    public String toString(){
        return "accessToken="+ this.token + "&" +"refreshToken=" + this.refreshToken;
    }
}
