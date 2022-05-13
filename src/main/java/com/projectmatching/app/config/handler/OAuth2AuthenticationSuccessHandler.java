package com.projectmatching.app.config.handler;

import com.projectmatching.app.config.YAMLConfig;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.util.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final AuthTokenProvider authTokenProvider;
    private final UserRepository userRepository;
    private final YAMLConfig yamlConfig;

    private RequestCache requestCache = new HttpSessionRequestCache();
    private RedirectStrategy redirectStratgy = new DefaultRedirectStrategy();


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        UserDto user = toDto(oAuth2User);
        String token = authTokenProvider.createToken(user);
        log.info("Oatuh 로그인후 토큰 생성  : {}",token);

        writeTokenCookie(response,token);
        resultRedirectStrategy(request, response, authentication);

    }

    protected void resultRedirectStrategy(HttpServletRequest request, HttpServletResponse response,
                                          Authentication authentication) throws IOException, ServletException {
        SavedRequest savedRequest = requestCache.getRequest(request, response);
        if(savedRequest!=null) {
            String targetUrl = savedRequest.getRedirectUrl();
            redirectStratgy.sendRedirect(request, response, targetUrl);
        } else {
            String redirectUrl = request.getScheme() + "://" + request.getServerName() + ":"+yamlConfig.getPORT()+ "/callback";
            redirectStratgy.sendRedirect(request, response, redirectUrl);
        }

    }




    private void writeTokenResponse(HttpServletResponse response, String token) throws IOException {

        response.setContentType("text/html;charset=UTF-8");
        response.addHeader("Authorization",token);
        response.setContentType("application/json;charset=UTF-8");


    }

    private void writeTokenCookie(HttpServletResponse response, String token) throws UnsupportedEncodingException {

        authTokenProvider.createCookie(response,token);

    }



    private UserDto toDto(OAuth2User oAuth2User) {
       Map<String,Object> attributes = oAuth2User.getAttributes();
        return UserDto.builder()
                .email((String)attributes.get("email"))
                .name((String)attributes.get("name")).build();

    }
}
