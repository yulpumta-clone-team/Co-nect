package com.projectmatching.app.util;

import com.projectmatching.app.config.secret.Secret;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.dto.UserLoginResDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import static com.projectmatching.app.constant.JwtConstant.*;

@Slf4j
@RequiredArgsConstructor
@Component
@Getter @Setter
public class AuthTokenProvider {


    private final Key key;
    private String secretKey = Secret.JWT_SECRET_KEY;

    // 토큰 유효시간 30분
    private long tokenValidTime;



    @Autowired
    public AuthTokenProvider(){
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.tokenValidTime = 30 * 60 * 1000L;
    }



    // JWT 토큰 생성
    public String createToken(UserLoginResDto user){
        Claims claims = Jwts.claims(); // JWT payload 에 저장되는 정보단위
        claims.put(CLAIM_ROLE, user.getRole()); // 정보는 key / value 쌍으로 저장된다.
        claims.put(CLAIM_EMAIL,user.getEmail());
        claims.put(CLAIM_NAME,user.getName());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + tokenValidTime))// set Expire Time
                .signWith(key)
                .compact();

    }

    //JWT 토큰 생성 , OAuth Login 용
    public String createToken(UserDto user){
        Claims claims = Jwts.claims();
        claims.put(CLAIM_ROLE, Role.USER); // 정보는 key / value 쌍으로 저장된다.
        claims.put(CLAIM_EMAIL,user.getEmail());
        claims.put(CLAIM_NAME,user.getName());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + tokenValidTime))// set Expire Time
                .signWith(key)
                .compact();
    }



    // 토큰에서 회원 정보 추출
    public String getUserName(String token)  {
        return getClaimProperty(token,CLAIM_NAME,String.class);
    }

    public String getUserEmail(String token){
        return getClaimProperty(token,CLAIM_EMAIL,String.class);
    }

    public Role getUserRole(String token){
        return Role.valueOf(getClaimProperty(token,CLAIM_ROLE,String.class));
    }

    private <T> T getClaimProperty(String token, String property, Class<T> clazz) {
        Jws<Claims> claims = getParsedClaimsJws(token);
        return claims.getBody().get(property, clazz);
    }

    private Jws<Claims> getParsedClaimsJws(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }


    // Request의 Header에서 token 값을 가져옵니다. "Authorization" : "TOKEN값'
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }




    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey.getBytes()).build().parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * 토큰 쿠키에 저장
     *
     */
    public static void createCookie(HttpServletResponse response,String token){
        ResponseCookie AuthCookie = ResponseCookie.from("Authorization",token)
            .httpOnly(false)
            .sameSite("lax")
            .maxAge(60*60)
            .path("/")
            .build();

        response.addHeader("Set-Cookie",AuthCookie.toString());


    }


    /**
     * 쿠키에 있는 토큰 분석
     */

    public String resolveCookie(HttpServletRequest request){

        final Cookie[] cookies = request.getCookies();
        if(cookies == null)return null;
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

}
