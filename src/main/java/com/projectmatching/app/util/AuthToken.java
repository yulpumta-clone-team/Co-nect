package com.projectmatching.app.util;

import com.projectmatching.app.constant.JwtConstant;
import io.jsonwebtoken.*;
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
public class AuthToken {

    private final String token;
    private final Key key;


    private static final String AUTHORITIES_KEY = "role";

//    AuthToken(String id, Date expiry, Key key){
//        this.key = key;
//        this.token = createToken(id,expiry);
//
//    }
//
//    AuthToken(String id, String role, Date expiry, Key key){
//        this.key = key;
//        this.token = createToken(id,expiry);
//    }
//
//    private String createToken(String id , Date expiry){
//
//        return Jwts.builder()
//                .setSubject(id)
//                .signWith(key, SignatureAlgorithm.HS256)
//                .setExpiration(expiry)
//                .compact();
//
//    }
//
//    private String createToken(String id, String role, Date expiry){
//        return Jwts.builder()
//                .setSubject(id)
//                .claim(AUTHORITIES_KEY,role)
//                .signWith(key,SignatureAlgorithm.HS256)
//                .setExpiration(expiry)
//                .compact();
//    }

    public boolean validate(){
        return this.getTokenClaims() != null;
    }

    public Claims getTokenClaims(){
        try{
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
                    .getBody();
        }catch (SecurityException e){
            log.info("Invalid JWT signature.");
        } catch (MalformedJwtException e) {
            log.info("Invalid JWT token.");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
        }
        return  null;
    }


    public Claims getExpiredTokenClaims() {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
            return e.getClaims();
        }
        return null;
    }

    public MultiValueMap<String,String> asMultiValueMap(){
        MultiValueMap<String,String> map = new LinkedMultiValueMap<>();
        map.add(JwtConstant.HEADER_NAME,token);
        return map;

    }

    //헤더에 토큰 추가
    public HttpHeaders asHeaders() {return new HttpHeaders(asMultiValueMap());}

}
