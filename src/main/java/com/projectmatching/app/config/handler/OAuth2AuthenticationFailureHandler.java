package com.projectmatching.app.config.handler;

import com.projectmatching.app.config.YAMLConfig;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
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
public class OAuth2AuthenticationFailureHandler implements AuthenticationFailureHandler {
    private RedirectStrategy redirectStratgy = new DefaultRedirectStrategy();
    private final YAMLConfig yamlConfig;
    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        resultRedirectStrategy(httpServletRequest,httpServletResponse);
    }

    protected void resultRedirectStrategy(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        String redirectUrl = request.getScheme() + "://" + request.getServerName() + ":"+ yamlConfig.getFPORT()+ "/OauthFail";
        redirectStratgy.sendRedirect(request, response, redirectUrl);

    }

}
