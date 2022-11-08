package com.projectmatching.app.config.handler;

import com.projectmatching.app.config.YAMLConfig;
import com.projectmatching.app.domain.user.UserProfile;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.user.OAuthService;
import com.projectmatching.app.service.userInfoAdder.UserInfoAdderService;
import com.projectmatching.app.util.AuthToken;
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
    private final UserInfoAdderService userInfoAdderService;
    private RequestCache requestCache = new HttpSessionRequestCache();
    private RedirectStrategy redirectStratgy = new DefaultRedirectStrategy();


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth 로그인 SuccessHandler --- ");
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();


        UserDto user = toDto(oAuth2User);
        AuthToken authToken = authTokenProvider.createTokens(user);



        resultRedirectStrategy(request, response,authToken);

    }

    protected void resultRedirectStrategy(HttpServletRequest request, HttpServletResponse response,
                                         AuthToken authToken) throws IOException, ServletException {
        SavedRequest savedRequest = requestCache.getRequest(request, response);
        if(savedRequest!=null) {
            String targetUrl = savedRequest.getRedirectUrl();
            redirectStratgy.sendRedirect(request, response, targetUrl);
        } else {
            String redirectUrl = request.getScheme() + "://" + request.getServerName() + ":"+ yamlConfig.getFPORT()+ "/callback?" + authToken.toString();
            redirectStratgy.sendRedirect(request, response, redirectUrl);
        }

    }




    private void writeTokenResponse(HttpServletResponse response, String token) throws IOException {

        response.setContentType("text/html;charset=UTF-8");
        response.addHeader("Authorization",token);
        response.setContentType("application/json;charset=UTF-8");


    }



    private UserDto toDto(OAuth2User oAuth2User) {
       Map<String,Object> attributes = oAuth2User.getAttributes();

       UserDto userDto = UserDto.builder()
               .email((String)attributes.get("email")).build();

       return userInfoAdderService.userInfoAdder(userDto,(String)attributes.get("name"));


    }


    private User saveOrUpdate(UserProfile userProfile) {
        User user = userRepository.findByOauthId(userProfile.getOauthId())
                .map(m-> m.update(userProfile.getName(), userProfile.getEmail()))
                .orElse(userProfile.toUser());

        return userRepository.save(user);
    }
}
