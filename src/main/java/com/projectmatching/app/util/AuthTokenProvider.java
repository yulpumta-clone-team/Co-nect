package com.projectmatching.app.util;

import com.projectmatching.app.config.secret.Secret;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.dto.UserDto;

import com.projectmatching.app.exception.CoNectForbiddenException;
import com.projectmatching.app.exception.CoNectNotFoundException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;


import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import static com.projectmatching.app.constant.JwtConstant.*;

@Slf4j
@Component
@Getter @Setter
public class AuthTokenProvider {

    private static Key key;
    private String secretKey = Secret.JWT_SECRET_KEY;

    // 토큰 유효시간 30분
    private long tokenValidTime;
    private long refreshTokenValidTime;

    @Autowired
    public AuthTokenProvider(){
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.tokenValidTime = 30 * 60 * 1000L; //30분
        this.refreshTokenValidTime = tokenValidTime * 2 * 24 * 7; //7일
    }

    public AuthTokenProvider(Key key){
        this.key = key;
        this.tokenValidTime = 30 * 60 * 1000L; //30분
        this.refreshTokenValidTime = tokenValidTime * 2 * 24 * 7; //7일
    }




    public String createToken(UserDto user){
        Claims claims = Jwts.claims();
        claims.put(CLAIM_ROLE, Role.USER); // 정보는 key / value 쌍으로 저장된다.
        claims.put(CLAIM_EMAIL,user.getEmail());
        claims.put(CLAIM_NAME,user.getName());
        claims.put(CLAIM_ID,user.getId());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + tokenValidTime))// set Expire Time
                .signWith(key)
                .compact();
    }


    public String createRefreshToken(UserDto user){
        Claims claims = Jwts.claims();
        claims.put(CLAIM_ID,user.getId());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime))
                .signWith(key)
                .compact();
    }




    public AuthToken createTokens(UserDto userDto){
        return AuthToken.of(createToken(userDto),createRefreshToken(userDto));
    }



    // 토큰에서 회원 정보 추출
    public static String getUserName(String token)  {
        return getClaimProperty(token,CLAIM_NAME,String.class);
    }

    public static String getUserImg(String token) {return getClaimProperty(token,CLAIM_IMG,String.class);}


    public static Long getUserId(String token){return getClaimProperty(token,CLAIM_ID,Long.class);}

    public String getUserEmail(String token){
        return getClaimProperty(token,CLAIM_EMAIL,String.class);
    }

    public Role getUserRole(String token){
        return Role.valueOf(getClaimProperty(token,CLAIM_ROLE,String.class));
    }

    private static <T> T getClaimProperty(String token, String property, Class<T> clazz) {
        Jws<Claims> claims = getParsedClaimsJws(token);
        return claims.getBody().get(property, clazz);
    }

    private static Jws<Claims> getParsedClaimsJws(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }




    // 토큰의 유효성 + 만료일자 확인
    public boolean isTokenValid(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey.getBytes()).build().parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            e.printStackTrace();
            return false; //서명 불일치
        }
    }

    /**
     * 쿠키분석
     */

    public String resolveCookie(HttpServletRequest request){

        final Cookie[] cookies = request.getCookies();

        if(cookies == null)return null;
        log.info("size = {}",cookies.length);
        for(Cookie cookie : cookies){
            log.info("쿠키 이름 : {}",cookie.getName());
            log.info("쿠키 값 : {}",cookie.getValue());

            if(cookie.getName().equals("Authorization")){
                log.info("통과");
                return cookie.getValue();
            }
        }
        return null;

    }



    // Request의 Header에서 token 값을 가져옴 "Authorization" : "TOKEN값'
    public String resolveToken(HttpServletRequest request) {
        String token = request.getHeader(HEADER_NAME);
        if(token == null)throw new CoNectForbiddenException();
        return request.getHeader("Authorization");
    }

    public String resolveRefreshToken(HttpServletRequest request){
        if(isRefreshTokenExist(request)){
            return request.getHeader(REFRESH_TOKEN_HEADER_NAME);
        }
        throw new CoNectNotFoundException();
    }


    public boolean isTokenExist(HttpServletRequest request) {
        return isTokenExist(request, HEADER_NAME);
    }


    public boolean isRefreshTokenExist(HttpServletRequest request){
        return isTokenExist(request,REFRESH_TOKEN_HEADER_NAME);
    }

    private boolean isTokenExist(HttpServletRequest request, String name){
        return StringUtils.hasText(request.getHeader(name));
    }


    public Key getKey() {
        return this.key;
    }
}