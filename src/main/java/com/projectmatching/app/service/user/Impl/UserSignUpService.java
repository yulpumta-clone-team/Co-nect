package com.projectmatching.app.service.user.Impl;

import com.projectmatching.app.annotation.Validation;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.techStack.provider.TechStackProviderImpl;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserEssentialDto;
import com.projectmatching.app.domain.user.dto.UserJoinDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Repository
@Service
@Slf4j
public class UserSignUpService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TechStackProviderImpl techStackProvider;

    @Transactional
    @Validation
    public Long join(UserJoinDto userJoinDto) {
        try {
            userJoinDto.setPwd(passwordEncoder.encode(userJoinDto.getPwd())); //비밀번호 암호화
            checkDuplicateEmail(userJoinDto.getEmail());
            User user = userJoinDto.asEntity(Role.USER);

            log.info("유저 info : {}",user);

            return userRepository.save(user).getId();
        }catch (ResponeException e){
            throw e;
        }
    }


    @Transactional
    @Validation
    public void updateUserEssentialInfo(UserEssentialDto userEssentialDto){
        checkDuplicateName(userEssentialDto.getName());
        User user = userRepository.findByEmail(userEssentialDto.getEmail()).orElseThrow(CoNectNotFoundException::new);
        userRepository.save(user.updateEssentialInfo(userEssentialDto,techStackProvider));

    }


    /**
     * 유저 회원 가입에 담긴 이메일을 한번 더 체크함
     */
    private void checkDuplicateEmail(String email) throws ResponeException {
        if(userRepository.findByEmail(email).isPresent()){
            throw new ResponeException(ResponseTemplateStatus.EMAIL_DUPLICATE);
        }
    }

    /**
     * 유저 필수정보에 담긴 닉네임을 한번 더 체크함
     */
    private void checkDuplicateName(String name) throws ResponeException {
        if(userRepository.findByName(name).isPresent()){
            throw new ResponeException(ResponseTemplateStatus.NAME_DUPLICATE);
        }

    }







}
