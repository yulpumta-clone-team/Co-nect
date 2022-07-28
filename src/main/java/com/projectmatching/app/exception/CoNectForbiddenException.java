package com.projectmatching.app.exception;

import com.projectmatching.app.constant.ResponseTemplateStatus;

public class CoNectForbiddenException extends CoNectRuntimeException{
    public CoNectForbiddenException(){
        super(ResponseTemplateStatus.UNAUTHORIZED);
    }
}
