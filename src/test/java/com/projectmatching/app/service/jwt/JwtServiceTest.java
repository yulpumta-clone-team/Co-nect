package com.projectmatching.app.service.jwt;

import com.nimbusds.jwt.JWT;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.dto.UserLoginResDto;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.util.AuthTokenProvider;
import io.jsonwebtoken.ClaimJwtException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseCookie;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.context.event.annotation.BeforeTestExecution;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Objects;

import static com.projectmatching.app.constant.JwtConstant.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@DisplayName("jwt 토큰 관련 테스트")
public class JwtServiceTest extends ServiceTest {


    private String secretKeyForTest = "QWEDGsifgojspthijsdfoigjaeriw3r@Rkdfogjhijsidfafgkfghjhsjfgjsoeghkldkoskdfs";
    private Key key = Keys.hmacShaKeyFor(secretKeyForTest.getBytes(StandardCharsets.UTF_8));
    private AuthTokenProvider authTokenProvider = new AuthTokenProvider(key);

    @Mock
    private HttpServletRequest httpServletRequest;

    @Mock
    private HttpServletResponse httpServletResponse;

    private UserLoginResDto userLoginResDto = UserLoginResDto.builder()
            .role(Role.USER)
            .name("testName")
            .email("test@email.com")
            .build();

    private UserDto userDto = UserDto.builder()
            .name("testName")
            .email("test@email.com")
            .oauthId("testOauth")
            .build();
    private Claims claims = Jwts.claims();


    @BeforeEach
    private void setup(){
        authTokenProvider.setTokenValidTime(30*60*1000L);
        authTokenProvider.setSecretKey(secretKeyForTest);
    }

    @DisplayName("일반 로그인 토큰 정상 발급")
    @Test
    void When_User_Login_Expect_Token_has_been_Issued(){

        //given
        claims.put(CLAIM_ROLE, userLoginResDto.getRole()); // 정보는 key / value 쌍으로 저장된다.
        claims.put(CLAIM_EMAIL,userLoginResDto.getEmail());
        claims.put(CLAIM_NAME,userLoginResDto.getName());

        Date now = new Date();
        String jwts =Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + authTokenProvider.getTokenValidTime()))// set Expire Time
                .signWith(authTokenProvider.getKey())
                .compact();

        //when
        String token = authTokenProvider.createToken(userLoginResDto);


        //then
        Assertions.assertEquals(token, jwts);
        Assertions.assertEquals(userLoginResDto.getEmail(),authTokenProvider.getUserEmail(token));
        Assertions.assertEquals(userLoginResDto.getName(),authTokenProvider.getUserName(token));
    }


    @DisplayName("소셜 로그인 토큰 정상 발급 테스트")
    @Test
    void When_Social_Loign_Expect_Token_has_been_issued(){
        //given
        claims.put(CLAIM_ROLE,Role.USER); // 정보는 key / value 쌍으로 저장된다.
        claims.put(CLAIM_EMAIL,userDto.getEmail());
        claims.put(CLAIM_NAME,userDto.getName());

        Date now = new Date();
        String jwts =Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + authTokenProvider.getTokenValidTime()))// set Expire Time
                .signWith(authTokenProvider.getKey())
                .compact();

        //when
        String token = authTokenProvider.createToken(userDto);


        //then
        Assertions.assertEquals(token, jwts);
        Assertions.assertEquals(userDto.getEmail(),authTokenProvider.getUserEmail(token));
        Assertions.assertEquals(userDto.getName(),authTokenProvider.getUserName(token));
    }


    @DisplayName("토큰 유효성 검사 테스트 : 만료됨")
    @Test
    void When_Invalid_Token_Throw_Exception(){

        authTokenProvider.setTokenValidTime(0); //테스트를 위해 유효 시간 0으로 설정
        String token = authTokenProvider.createToken(userLoginResDto);
        Assertions.assertThrows(ExpiredJwtException.class,()->{
            authTokenProvider.validateToken(token);
        });
    }


    @DisplayName("쿠키 토큰 생성 테스트")
    @Test
    void When_Create_Token_Expect_Cookie_has_been_created(){
//
//        String token = authTokenProvider.createToken(userLoginResDto);
//        Cookie resultCookie = authTokenProvider.createCookie(httpServletResponse,token);
//
//
//        Assertions.assertEquals(resultCookie.getName(),"Authorization");
//        Assertions.assertEquals(resultCookie.getValue(),token);
    }


    @DisplayName("토큰 추출 테스트")
    @Test
    void When_got_Request_Expect_Cookie_has_token(){
        String token = authTokenProvider.createToken(userLoginResDto);
        Cookie cookie = new Cookie("Authorization",token);

        when(httpServletRequest.getCookies()).then(I-> {
            return new Cookie[]{cookie};
            }
        );
        String resolvedToken = authTokenProvider.resolveCookie(httpServletRequest);
        Assertions.assertEquals(token,resolvedToken);
    }

}
