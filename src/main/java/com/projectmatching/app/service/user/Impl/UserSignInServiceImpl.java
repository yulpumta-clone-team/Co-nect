package com.projectmatching.app.service.user.Impl;

import com.projectmatching.app.annotation.Validation;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.user.QUserRepository;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserLoginDto;
import com.projectmatching.app.domain.user.dto.UserLoginResDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.user.UserSignInService;
import com.projectmatching.app.util.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

import static com.projectmatching.app.constant.ResponseTemplateStatus.LOGIN_USER_ERROR;
import static com.projectmatching.app.util.AuthTokenProvider.createCookie;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserSignInServiceImpl implements UserSignInService {

    private final UserRepository userRepository;
    private final QUserRepository qUserRepository;
    private final AuthTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    //유저 로그인
    /**
     * 해당 유저 존재하면
     * 토큰을 만들어 헤더에 저장하고
     * 유저 정보와
     * 최초 로그인인지 확인 하여 전달
     *
     */
    @Transactional(readOnly = true)
    @Validation
    public UserLoginResDto userLogin(UserLoginDto userLoginDto, HttpServletResponse response){
        try {
            User user = userRepository.findByEmail(userLoginDto.getEmail()).orElseThrow(NullPointerException::new);
            if(passwordEncoder.matches(userLoginDto.getPwd(),user.getPwd())){
                //로그인 성공시 유저 이미지와 이름 아이디를 반환, 최초 로그인인지도 체크하여 반환
                UserLoginResDto userLoginResDto = Optional.ofNullable(qUserRepository.login(userLoginDto))
                        .map(UserLoginResDto::toUserLoginResDto)
                        .orElseThrow(NullPointerException::new);
                createCookie(response, jwtTokenProvider.createToken(userLoginResDto)); //쿠키 생성
                return userLoginResDto;
            }

            throw new ResponeException(LOGIN_USER_ERROR);

        }catch (NullPointerException e){
            e.printStackTrace();
            throw new ResponeException(LOGIN_USER_ERROR);
        }
    }

    @Transactional
    public void userDelete(String userEamil){
        qUserRepository.deleteUser(userEamil);
        log.info("유저 삭제됨 user email = {}",userEamil);
    }






}
