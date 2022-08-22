package com.projectmatching.app.exception;

import com.projectmatching.app.constant.ResponseTemplateStatus;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CoNectRuntimeException extends RuntimeException{
    protected final HttpStatus httpStatus;
    protected final String message;
    protected final int code;

    public CoNectRuntimeException(ResponseTemplateStatus responseTemplateStatus) {
        this.httpStatus = responseTemplateStatus.getHttpStatus();
        this.message = responseTemplateStatus.getMessage();
        this.code = responseTemplateStatus.getCode();

    }

    public CoNectRuntimeException(ResponseTemplateStatus responseTemplateStatus,String msg){
        this.httpStatus = responseTemplateStatus.getHttpStatus();
        this.message = msg;
        this.code = responseTemplateStatus.getCode();
    }
}
