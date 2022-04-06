package com.projectmatching.app.config.aspect;

import com.projectmatching.app.domain.Validatable;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class FormValidationAspect {

    /**
     * {@link Validatable} 타입을 검사하게끔 한다
     * args는 파라미터 이름이 아니라 순서와 타입만을 통해 판단된다
     */
    @Around("@annotation(com.projectmatching.app.annotation.Validation)")
    public Object proceed(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Arrays.stream(proceedingJoinPoint.getArgs())
                .filter(arg -> arg instanceof Validatable)
                .map(arg -> (Validatable) arg)
                .forEach(Validatable::validate);
        return proceedingJoinPoint.proceed();

    }
}
