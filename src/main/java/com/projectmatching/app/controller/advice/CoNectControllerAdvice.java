package com.projectmatching.app.controller.advice;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice("com.projectmatching.app.controller")
@Order(Ordered.HIGHEST_PRECEDENCE)
@Slf4j
public class CoNectControllerAdvice {

    @ExceptionHandler(ResponeException.class)
    public ResponseEntity<ResponseTemplate<ResponseTemplateStatus>> except(ResponeException e){
        e.printStackTrace();
        log.info("Controller Advice , Exception : {}",e);
        ResponseTemplateStatus status = e.getResponseTemplateStatus();
        return ResponseEntity.status(status.getHttpStatus()) //http code
                .body(ResponseTemplate.of(status));
    }


}
