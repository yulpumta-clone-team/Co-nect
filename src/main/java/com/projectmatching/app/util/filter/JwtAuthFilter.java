package com.projectmatching.app.util.filter;

import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.util.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.LinkedHashSet;



@RequiredArgsConstructor
@Slf4j
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final AuthTokenProvider authTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = authTokenProvider.resolveCookie(request);
        // 유효한 토큰인지 확인합니다.
        if (token != null && authTokenProvider.validateToken(token)) {
            log.info("토큰 유효");
            // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
            Authentication authentication = getAuthentication(token);
            // SecurityContext 에 Authentication 객체를 저장합니다.
            log.info("Authentication = {}",authentication);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        Collection<String> excludeUrlPatterns = new LinkedHashSet<>();
        excludeUrlPatterns.add("/login/**");
        excludeUrlPatterns.add("/join/**");
        excludeUrlPatterns.add("/h2-console/**");
        return excludeUrlPatterns.stream()
                .anyMatch(pattern -> new AntPathMatcher().match(pattern, request.getServletPath()));
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
