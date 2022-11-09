package com.projectmatching.app.config.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectmatching.app.config.YAMLConfig;

import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.exception.CoNectRuntimeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
@Slf4j
public class OAuth2AuthenticationFailureHandler implements AuthenticationFailureHandler {
    private RedirectStrategy redirectStratgy = new DefaultRedirectStrategy();
    private final YAMLConfig yamlConfig;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        OAuth2AuthenticationException ex = (OAuth2AuthenticationException) e;

        resultRedirectStrategy(httpServletRequest,httpServletResponse);

    }


    private void resultRedirectStrategy(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        String redirectUrl = request.getScheme() + "://" + request.getServerName() + ":"+ yamlConfig.getFPORT()+ "/OauthFail";

        redirectStratgy.sendRedirect(request, response, redirectUrl);

    }

}
