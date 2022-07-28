package com.projectmatching.app.exception;

import com.projectmatching.app.constant.ResponseTemplateStatus;
import org.springframework.http.HttpStatus;

public class CoNectRuntimeException extends RuntimeException{
    protected final HttpStatus httpStatus;
    protected final String message;
    protected final int code;

    public CoNectRuntimeException(ResponseTemplateStatus responseTemplateStatus) {
        this.httpStatus = responseTemplateStatus.getHttpStatus();
        this.message = responseTemplateStatus.getMessage();
        this.code = responseTemplateStatus.getCode();

    }
}
