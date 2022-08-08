package com.projectmatching.app.service.user.Impl;

import com.projectmatching.app.annotation.Validation;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.user.QUserRepository;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.dto.UserIsFirstDto;
import com.projectmatching.app.domain.user.dto.UserLoginDto;
import com.projectmatching.app.domain.user.dto.UserLoginResDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.util.AuthToken;
import com.projectmatching.app.util.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

import static com.projectmatching.app.constant.ResponseTemplateStatus.LOGIN_USER_ERROR;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserSignInService {

    private final UserRepository userRepository;
    private final QUserRepository qUserRepository;
    private final AuthTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    /**
     * 해당 유저 존재하면
     * 토큰을 만듦
     * @param userLoginDto
     * @return AuthToken
     *
     */
    @Transactional(readOnly = true)
    @Validation
    public AuthToken userLogin(UserLoginDto userLoginDto){
        try {
            User user = userRepository.findByEmail(userLoginDto.getEmail()).orElseThrow(CoNectNotFoundException::new);
            if(passwordEncoder.matches(userLoginDto.getPwd(),user.getPwd())){
                return jwtTokenProvider.createTokens(UserDto.of(user));

            }

            throw new ResponeException(LOGIN_USER_ERROR);

        }catch (NullPointerException e){
            e.printStackTrace();
            throw new ResponeException(LOGIN_USER_ERROR);
        }
    }



    @Transactional(readOnly = true)
    public UserIsFirstDto isFirstLoginUserCheck(UserDetailsImpl userDetails){
        User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow(CoNectNotFoundException::new);

        if(isUserNameNull(user))UserIsFirstDto.builder().isFirst(true).build();

        return UserIsFirstDto.builder().isFirst(false).build();

    }

    private boolean isUserNameNull(User user){
        if(user.getName() != null)return false;
        else return true;

    }


    @Transactional
    public void userDelete(String userEamil){
        qUserRepository.deleteUser(userEamil);
        log.info("유저 삭제됨 user email = {}",userEamil);
    }






}
