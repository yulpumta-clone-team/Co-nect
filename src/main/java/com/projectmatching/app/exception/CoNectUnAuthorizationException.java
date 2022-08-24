package com.projectmatching.app.exception;

import com.projectmatching.app.constant.ResponseTemplateStatus;
import org.springframework.security.core.AuthenticationException;

public class CoNectUnAuthorizationException extends CoNectRuntimeException {

    public CoNectUnAuthorizationException() {
        super(ResponseTemplateStatus.UNAUTHORIZED);
    }

    public CoNectUnAuthorizationException(String msg){
        super(ResponseTemplateStatus.UNAUTHORIZED,msg);
    }
}

