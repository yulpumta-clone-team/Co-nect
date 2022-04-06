package com.projectmatching.app.service.user.Impl;

import com.projectmatching.app.annotation.Validation;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserJoinDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.user.UserSignUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.projectmatching.app.constant.ServiceConstant.NAME_SIZE_MAX;
import static com.projectmatching.app.constant.ServiceConstant.REGEX_EMAIL;

@RequiredArgsConstructor
@Repository
@Service
@Slf4j
public class UserSignUpServiceImpl implements UserSignUpService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Transactional
    @Validation
    @Override
    public Long join(UserJoinDto userJoinDto) {
        try {
            checkUserValidation(userJoinDto);
            userJoinDto.setPwd(passwordEncoder.encode(userJoinDto.getPwd())); //비밀번호 암호화
            User user = userJoinDto.asEntity(Role.USER);
            log.info("유저 info : {}",user);

            return userRepository.save(user).getId();
        }catch (ResponeException e){
            throw e;
        }
    }


    private void checkUserValidation(UserJoinDto userDto)throws ResponeException {

        //형식 체크
        validateEmail(userDto.getEmail());
        validateName(userDto.getName());
        //중복 체크
        checkDuplicateEmail(userDto.getEmail());
        checkDuplicateName(userDto.getName());

    }

    private void checkDuplicateEmail(String email) throws ResponeException {
        if(userRepository.findByEmail(email).isPresent()){
            throw new ResponeException(ResponseTemplateStatus.EMAIL_DUPLICATE);
        }
    }

    private void checkDuplicateName(String name) throws ResponeException {
        if(userRepository.findByName(name).isPresent()){
            throw new ResponeException(ResponseTemplateStatus.NAME_DUPLICATE);
        }

    }



    //이메일 정규식 검증

    private void validateEmail(String email) throws ResponeException {
        if(!REGEX_EMAIL.matcher(email).matches()){
            throw new ResponeException(ResponseTemplateStatus.EMAIL_FORM_INVALID);
        }
    }

    //닉네임 검증
    private void validateName(String name)throws ResponeException{
        if(name.length() > NAME_SIZE_MAX){
            throw new ResponeException(ResponseTemplateStatus.NAME_SIZE_INVALID);
        }
    }


}
