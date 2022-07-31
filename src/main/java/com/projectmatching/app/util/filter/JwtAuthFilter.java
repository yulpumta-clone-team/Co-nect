package com.projectmatching.app.util.filter;

import com.projectmatching.app.constant.JwtConstant;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.util.AuthToken;
import com.projectmatching.app.util.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;



@RequiredArgsConstructor
@Component
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final AuthTokenProvider authTokenProvider;
    private final UserRepository userRepository;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if(authTokenProvider.isTokenExist(request)){
            String token = authTokenProvider.resolveToken(request);
            if (authTokenProvider.isTokenValid(token)) {
                log.info("토큰 유효");
                // SecurityContext 에 Authentication 객체를 저장합니다.
                setAuthentication(token);
            }else{
                if(authTokenProvider.isRefreshTokenExist(request)){
                    String refreshToken = authTokenProvider.resolveRefreshToken(request);
                    if(!authTokenProvider.isTokenValid(refreshToken)){
                        reIssueAccessToken(refreshToken,response);
                    }
                }
            }
        }
        // 유효한 토큰인지 확인합니다.

        filterChain.doFilter(request, response);
    }

    private void setAuthentication(String token){
        SecurityContextHolder.getContext().setAuthentication(getAuthentication(token));
    }

    private void reIssueAccessToken(String refreshToken, HttpServletResponse response){

        Long memberId = AuthTokenProvider.getUserId(refreshToken);
        AuthToken authToken = authTokenProvider.createTokens(
                UserDto.of(
                        (userRepository.findById(memberId)
                                .orElseThrow(CoNectNotFoundException::new))
                )
        );
        setAuthentication(authToken.getToken());
        response.setHeader(JwtConstant.HEADER_NAME,authToken.getToken());
        response.setHeader(JwtConstant.REFRESH_TOKEN_HEADER_NAME,authToken.getRefreshToken());
    }

    // JWT 토큰에서 인증 정보 조회
    private Authentication getAuthentication(String token) {
        UserDetails userDetails = UserDetailsImpl.builder()
                .email(authTokenProvider.getUserEmail(token))
                .name(authTokenProvider.getUserName(token))
                .role(authTokenProvider.getUserRole(token))
                .build();
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

}
