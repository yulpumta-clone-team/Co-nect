package com.projectmatching.app.service.user.Impl;

import com.projectmatching.app.annotation.Validation;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.techStack.TechStackRepository;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.domain.techStack.provider.TechStackProviderImpl;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserEssentialDto;
import com.projectmatching.app.domain.user.dto.UserJoinDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.domain.user.entity.UserTech;
import com.projectmatching.app.domain.user.repository.UserTechRepository;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


@RequiredArgsConstructor
@Service
@Slf4j
public class UserSignUpService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TechStackProviderImpl techStackProvider;
    private final UserTechRepository userTechRepository;

    @Transactional
    @Validation
    public Long join(UserJoinDto userJoinDto) {
        try {
            userJoinDto.setPwd(passwordEncoder.encode(userJoinDto.getPwd())); //비밀번호 암호화
            checkDuplicateEmail(userJoinDto.getEmail());
            User user = userJoinDto.asEntity(Role.USER);

            log.info("유저 info : {}", user);
            userRepository.save(user);
            return user.getId();
        } catch (ResponeException e) {
            throw e;
        }
    }


    @Transactional
    @Validation
    public void updateUserEssentialInfo(UserEssentialDto userEssentialDto, UserDetailsImpl userDetails) {
        checkDuplicateName(userEssentialDto.getName());
        User user = userRepository.findById(userDetails.getUserId()).orElseThrow(CoNectNotFoundException::new);
        user.updateEssentialInfo(userEssentialDto);

        //이미 있는것들 비우고 다시 넣음
        user.getSkills().clear();
        addUsersTechStackByUserEssentialDto(userEssentialDto, user);
    }

    //유저 기술스택 저장을 위해 차례로 db에 insert
    // 1. techCode to TechStack Entity then save TechStack
    // 2. make UserTech Entity by user and TechStack
    // 3. save UserTech entity to Repository
    private void addUsersTechStackByUserEssentialDto(UserEssentialDto userEssentialDto, User user) {
        techStackProvider.extractTechCodeByKeys(userEssentialDto.getSkills())
                .stream()
                .map(TechStack::of)
                .map(techStack -> UserTech.of(techStack, user))
                .forEach(userTech -> userTechRepository.save(userTech));

    }


    /**
     * 유저 회원 가입에 담긴 이메일을 한번 더 체크함
     */
    private void checkDuplicateEmail(String email) throws ResponeException {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new ResponeException(ResponseTemplateStatus.EMAIL_DUPLICATE);
        }
    }

    /**
     * 유저 필수정보에 담긴 닉네임을 한번 더 체크함
     */
    private void checkDuplicateName(String name) throws ResponeException {
        if (userRepository.findByName(name).isPresent()) {
            throw new ResponeException(ResponseTemplateStatus.NAME_DUPLICATE);
        }

    }
}