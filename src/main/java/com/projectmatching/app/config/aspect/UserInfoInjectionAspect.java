package com.projectmatching.app.config.aspect;

import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.dto.UserInfoDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectLogicalException;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.service.userInfoAdder.UserInfoAdderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;



/**
 * @UserInfoContainedInReturnVal 가 붙은 메소드가 값을 return 할때 적용
 * userInfo에 이용자 자신의 정보가 들어갔을때만 사용
 */
@RequiredArgsConstructor
@Slf4j
@Aspect
@Component
public class UserInfoInjectionAspect {

    private final UserRepository userRepository;

    @AfterReturning(
            pointcut = "@annotation(com.projectmatching.app.annotation.UserInfoContainedInReturnVal)",
            returning = "results"
    )
    public void makeUserInfoAdvisor(JoinPoint joinPoint, Object results) throws Throwable {
        UserDetailsImpl userDetails = (UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User subjectUser= userRepository.findById(userDetails.getUserId()).orElseThrow(CoNectLogicalException::new);

        if(results instanceof UserInfoDto){
            ((UserInfoDto)results).setUserInfoWith(subjectUser);
        }
    }


    @AfterReturning(
            pointcut = "@annotation(com.projectmatching.app.annotation.UserInfoContainedInReturnVal)",
            returning = "results"
    )
    public void makeUserInfoAdvisorForListObject(JoinPoint joinPoint, List<Object> results){
        UserDetailsImpl userDetails = (UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User subjectUser= userRepository.findById(userDetails.getUserId()).orElseThrow(CoNectLogicalException::new);

        results.stream().filter(obj-> obj instanceof UserInfoDto).map(
                userInfoDto ->  {
                    ((UserInfoDto)userInfoDto).setUserInfoWith(subjectUser);
                    return userInfoDto;
                })
                .collect(Collectors.toList());


    }
}
