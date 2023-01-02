package com.projectmatching.app.service.user;

import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.user.UserProfile;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Slf4j
public class OAuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        log.info("custom OauthService----");
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest); // OAuth 서비스(github, google, naver)에서 가져온 유저 정보를 담고있음


        String registrationId = userRequest.getClientRegistration()
                .getRegistrationId(); // OAuth 서비스 이름(ex. github, naver, google)

        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName(); // OAuth 로그인 시 키(pk)가 되는 값

        Map<String, Object> attributes = oAuth2User.getAttributes(); // OAuth 서비스의 유저 정보들

        UserProfile userProfile = OAuthAttributes.extract(registrationId, attributes); // registrationId에 따라 유저 정보를 통해 공통된 UserProfile 객체로 만들어 줌

        oAuthUserValidationCheck(userProfile);
        User user = saveOrUpdate(userProfile); // DB에 저장


        //DefaultOAuth2User의 권한을 가진 User를 load합니다.
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(user.getRolekey())),
                attributes,
                userNameAttributeName);

    }

    /**
     * OAuth 로그인 유저 로그인 로직 유효성 검사
     *
     * 1. 처음 oauth로 로그인 한 경우 -> 정상적으로 User db에 저장
     * 2. 두번째 로그인한 경우 -> 정상적으로 로그인
     * 3. 처음 로그인하는데 동일한 이메일을 갖고있는 유저가 이미 있는 경우 -> exception 발생
     *
     * oauth 아이디와 email이 같은 경우 동일한 oauth 로그인 유저로 판단
     *
     *
     */
    @Transactional
    public void oAuthUserValidationCheck(UserProfile userProfile){
        if(userRepository.existsByEmail(userProfile.getEmail())){
            User user = userRepository.findByEmail(userProfile.getEmail()).get();
            log.info("userProfile.getEmail {}",userProfile.getEmail());
            log.info("user oAuth {}",user.getOauthId());
            if(!user.getOauthId().equals(userProfile.getOauthId()))
                throw new OAuth2AuthenticationException(String.valueOf(ResponseTemplateStatus.EMAIL_DUPLICATE.getMessage()));

        }

    }
    @Transactional
    public User saveOrUpdate(UserProfile userProfile) {
        User user = userRepository.findByOauthId(userProfile.getOauthId())
                .map(m-> m.update(userProfile.getEmail()))
                .orElse(userProfile.toUser());

        return userRepository.save(user);
    }
}