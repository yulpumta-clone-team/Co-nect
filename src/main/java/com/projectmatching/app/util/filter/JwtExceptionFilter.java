package com.projectmatching.app.util.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.exception.CoNectRuntimeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtExceptionFilter extends OncePerRequestFilter {
    private final ObjectMapper objectMapper;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);

        } catch (CoNectRuntimeException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            ResponseTemplateStatus errorDetail = ResponseTemplateStatus.findByHttpStatus(e.getHttpStatus());
            objectMapper.writeValue(response.getWriter(), ResponseTemplate.of(errorDetail, e.getMessage()));
        }
    }
}
